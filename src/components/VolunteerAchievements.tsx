'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Trophy, Users, Calendar, Award, Compass, ShieldCheck } from 'lucide-react';

export default function VolunteerAchievements() {
  const { volunteering, achievements } = portfolioData;

  return (
    <section id="achievements" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Community & Recognition</div>
          <h2 className="section-title">Leadership & Achievements</h2>
          <p className="section-subtitle">
            Community contributions, student body leadership, global competitive programming, and sports milestones.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          
          {/* Volunteer & Leadership Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(59, 130, 246, 0.15)' }}>
                <Users size={22} color="var(--accent-blue)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                Volunteer Experience
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {volunteering.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.role}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />
                      {item.period}
                    </span>
                  </div>

                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: item.description ? '0.5rem' : 0 }}>
                    {item.organization}
                  </div>

                  {item.description && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.15)' }}>
                <Trophy size={22} color="var(--accent-amber)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                Honors & Competitions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    {item.badge && (
                      <span className="badge badge-amber">
                        <Award size={13} />
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <span>{item.event}</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.year}</span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
