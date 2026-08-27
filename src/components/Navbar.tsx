'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Sun, Moon, FileDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export default function Navbar({ onOpenResumeModal }: NavbarProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Sync with saved preference or system preference
    const saved = localStorage.getItem('dinojan-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'publication', 'skills', 'education', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('dinojan-theme', nextTheme);
  };

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#publication' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Leadership', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 1000,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'Outfit',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
          }}
        >
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            DV
          </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
            {portfolioData.personal.shortName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1.25rem',
              alignItems: 'center',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      padding: '0.35rem 0',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--accent-blue)' : 'var(--text-secondary)')}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--accent-blue)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Resume Trigger CTA */}
            <button
              onClick={onOpenResumeModal}
              className="btn btn-primary btn-sm"
              style={{ padding: '0.45rem 1rem' }}
            >
              <FileDown size={16} />
              <span>Get CV</span>
            </button>
          </div>
        </nav>

        {/* Mobile Actions & Menu Toggle */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="mobile-nav-toggle">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 1001,
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'block',
                    padding: '0.5rem 0',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResumeModal();
            }}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <FileDown size={18} />
            <span>Download Specialized CV</span>
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 868px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-nav-toggle) {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
