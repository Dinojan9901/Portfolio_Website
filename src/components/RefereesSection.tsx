'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { UserCheck, Mail, Phone, Building2 } from 'lucide-react';

export default function RefereesSection() {
  const { referees } = portfolioData;

  return (
    <section id="referees" className="section-wrapper" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Academic References</div>
          <h2 className="section-title">Referees</h2>
          <p className="section-subtitle">
            Senior faculty members and researchers from the University of Ruhuna who can vouch for my technical, academic, and project performance.
          </p>
        </div>

        {/* Referees Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {referees.map((ref, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{ref.name}</h3>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {ref.title}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', flex: 1 }}>
                <Building2 size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <span>{ref.department}, {ref.institution}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <a
                  href={`mailto:${ref.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  <Mail size={15} color="var(--accent-blue)" />
                  <span>{ref.email}</span>
                </a>

                <a
                  href={`tel:${ref.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <Phone size={15} color="var(--accent-emerald)" />
                  <span>{ref.phone}</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
