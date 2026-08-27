'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Code2, Brain, Cloud, CheckCircle2, Flame, Languages, HeartHandshake, Check } from 'lucide-react';

export default function SkillsSection() {
  const { skillGroups, softSkills, languages } = portfolioData;

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Brain': return <Brain size={22} color="var(--accent-violet)" />;
      case 'Cloud': return <Cloud size={22} color="var(--accent-cyan)" />;
      case 'CheckCircle2': return <CheckCircle2 size={22} color="var(--accent-emerald)" />;
      default: return <Code2 size={22} color="var(--accent-blue)" />;
    }
  };

  return (
    <section id="skills" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Technical Competencies</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Core programming languages, machine learning frameworks, cloud orchestration tools, and automated testing suites.
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          {skillGroups.map((group, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getCategoryIcon(group.icon)}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {group.category}
                </h3>
              </div>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: skill.hot ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-tertiary)',
                      border: skill.hot ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--border-subtle)',
                      fontSize: '0.84rem',
                      fontFamily: 'Inter',
                      fontWeight: skill.hot ? 600 : 500,
                      color: skill.hot ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {skill.hot && <Flame size={13} color="#f97316" />}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Non-Technical & Languages Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* Soft Skills Card */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)' }}>
                <HeartHandshake size={20} color="var(--accent-amber)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                Professional & Leadership Qualities
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
              {softSkills.map((ability, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                  }}
                >
                  <Check size={16} color="var(--accent-emerald)" />
                  <span>{ability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Card */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)' }}>
                <Languages size={20} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                Language Proficiency
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{lang.name}</span>
                  <span className="badge" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-cyan)' }}>
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
