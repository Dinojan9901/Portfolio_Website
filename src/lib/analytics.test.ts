import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_EVENTS,
  trackContactFormSubmit,
  trackCvOrProfileClick,
  trackEvent,
  trackProjectLinkClick,
} from './analytics';

function loadGa() {
  const gtag = vi.fn();
  vi.stubGlobal('window', { gtag });
  return gtag;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('event names', () => {
  it('match the names configured in GA4 and the weekly report', () => {
    expect(ANALYTICS_EVENTS).toEqual({
      contactFormSubmit: 'contact_form_submit',
      projectLinkClick: 'project_link_click',
      cvOrProfileClick: 'cv_or_profile_click',
    });
  });
});

describe('when GA is loaded', () => {
  it('sends contact_form_submit with no parameters', () => {
    const gtag = loadGa();
    trackContactFormSubmit();
    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith('event', 'contact_form_submit', {});
  });

  it('sends project_link_click with the project id, link type and placement', () => {
    const gtag = loadGa();
    trackProjectLinkClick('lendlot', 'live');
    trackProjectLinkClick('autograde-pro', 'source', 'publication');
    expect(gtag).toHaveBeenNthCalledWith(1, 'event', 'project_link_click', {
      project: 'lendlot',
      link_type: 'live',
      placement: 'projects',
    });
    expect(gtag).toHaveBeenNthCalledWith(2, 'event', 'project_link_click', {
      project: 'autograde-pro',
      link_type: 'source',
      placement: 'publication',
    });
  });

  it('sends cv_or_profile_click, adding cv_track only for CV links', () => {
    const gtag = loadGa();
    trackCvOrProfileClick('github', 'hero');
    trackCvOrProfileClick('cv', 'cv_modal', 'ai-ml');
    expect(gtag).toHaveBeenNthCalledWith(1, 'event', 'cv_or_profile_click', { target: 'github', placement: 'hero' });
    expect(gtag).toHaveBeenNthCalledWith(2, 'event', 'cv_or_profile_click', {
      target: 'cv',
      placement: 'cv_modal',
      cv_track: 'ai-ml',
    });
  });

  it('sends exactly the parameters it is given', () => {
    const gtag = loadGa();
    trackEvent('cv_or_profile_click', { target: 'linkedin', placement: 'footer' });
    expect(Object.keys(gtag.mock.calls[0][2]).sort()).toEqual(['placement', 'target']);
  });
});

describe('when GA is not loaded', () => {
  it('does nothing when the page has no gtag (NEXT_PUBLIC_GA_ID unset)', () => {
    vi.stubGlobal('window', {});
    expect(() => {
      trackContactFormSubmit();
      trackProjectLinkClick('larkway', 'source');
      trackCvOrProfileClick('cv', 'cv_modal', 'software');
    }).not.toThrow();
  });

  it('does nothing during server rendering, where window is undefined', () => {
    vi.stubGlobal('window', undefined);
    expect(() => trackContactFormSubmit()).not.toThrow();
  });

  it('ignores a gtag value that is not a function', () => {
    vi.stubGlobal('window', { gtag: 'not-a-function' });
    expect(() => trackProjectLinkClick('lendlot', 'live')).not.toThrow();
  });
});
