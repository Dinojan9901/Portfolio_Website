'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 0 2rem 0',
      }}
    >
      <div className="container">
        
        {/* Top Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '400px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'Outfit',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-brand)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                }}
              >
                DV
              </span>
              <span>{personal.name}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Full-Stack Developer, AI/ML & DevOps Engineer. Building reactive, scalable, and intelligent software systems from prototype to production.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Home', 'Experience', 'Projects', 'Publication', 'Skills', 'Education', 'Achievements', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              Connect & Source
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-secondary btn-sm"
              >
                <Github size={16} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-secondary btn-sm"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="btn btn-secondary btn-sm"
              >
                <Mail size={16} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="btn btn-outline btn-sm"
              style={{ marginTop: '0.5rem' }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: '0.84rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
          <div>
            Built with <strong>Next.js</strong>, <strong>TypeScript</strong> & modern CSS.
          </div>
        </div>

      </div>
    </footer>
  );
}
