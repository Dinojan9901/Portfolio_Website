// GA4 event tracking. Every event name and its parameters live here so they can't drift
// between components (scripts/ga4_report reads the same names).
//
// Privacy: parameters are fixed labels only (project ids, link types, page placements).
// Never pass names, email addresses, message text or anything a visitor typed.

export const ANALYTICS_EVENTS = {
  contactFormSubmit: 'contact_form_submit',
  projectLinkClick: 'project_link_click',
  cvOrProfileClick: 'cv_or_profile_click',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type ProjectLinkType = 'live' | 'source' | 'model';
export type ProfileTarget = 'linkedin' | 'github' | 'cv';
export type LinkPlacement = 'hero' | 'projects' | 'publication' | 'contact' | 'footer' | 'cv_modal';

interface EventParams {
  contact_form_submit: Record<string, never>;
  project_link_click: { project: string; link_type: ProjectLinkType; placement: LinkPlacement };
  cv_or_profile_click: { target: ProfileTarget; placement: LinkPlacement; cv_track?: string };
}

declare global {
  interface Window {
    // Defined by the GA4 snippet that @next/third-parties injects; absent when GA isn't loaded.
    gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent<N extends AnalyticsEventName>(name: N, params: EventParams[N]): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** The key conversion: call only after the message was actually delivered. */
export function trackContactFormSubmit(): void {
  trackEvent(ANALYTICS_EVENTS.contactFormSubmit, {});
}

export function trackProjectLinkClick(project: string, linkType: ProjectLinkType, placement: LinkPlacement = 'projects'): void {
  trackEvent(ANALYTICS_EVENTS.projectLinkClick, { project, link_type: linkType, placement });
}

export function trackCvOrProfileClick(target: ProfileTarget, placement: LinkPlacement, cvTrack?: string): void {
  trackEvent(ANALYTICS_EVENTS.cvOrProfileClick, cvTrack ? { target, placement, cv_track: cvTrack } : { target, placement });
}
