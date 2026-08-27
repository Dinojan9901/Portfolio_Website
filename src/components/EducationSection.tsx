'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';

export default function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="section-wrapper" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Academic Background</div>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal engineering foundations in computer science, software architecture, algorithms, and distributed systems.
          </p>
        </div>

        {/* Education Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '850px', margin: '0 auto' }}>
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: idx === 0 ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: idx === 0 ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <GraduationCap size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {edu.degree}
                    </h3>
                    <div style={{ color: 'var(--accent-cyan)', fontWeight: 500, fontSize: '0.95rem' }}>
                      {edu.institution}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    background: 'var(--bg-tertiary)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Details & Coursework */}
              <div style={{ paddingLeft: '3.75rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {edu.details.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color="var(--accent-blue)"
                        style={{ flexShrink: 0, marginTop: '0.25rem' }}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
