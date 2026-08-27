'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle, Layers } from 'lucide-react';

export default function Experience() {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Career History</div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Hands-on software engineering experience architecting, testing, and deploying production web systems and cloud infrastructure.
          </p>
        </div>

        {/* Experience Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: index === 0 ? 'var(--gradient-brand)' : 'var(--accent-blue)',
                }}
              />

              {/* Role & Company Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 700 }}>
                      {exp.role}
                    </h3>
                    <span className={`badge ${exp.type === 'Full-time' ? 'badge-emerald' : 'badge-purple'}`}>
                      {exp.type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '1.05rem' }}>
                    <Briefcase size={18} />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    <Calendar size={15} />
                    <span>{exp.period}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <MapPin size={15} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Bullet Descriptions */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {exp.description.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle
                      size={18}
                      color="var(--accent-cyan)"
                      style={{ flexShrink: 0, marginTop: '0.2rem' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Layers size={15} />
                  <span>Technologies & Tooling:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.8rem',
                        fontFamily: 'Fira Code',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
