'use client';

import React, { useState } from 'react';
import { portfolioData, Project } from '@/data/portfolioData';
import { Github, ExternalLink, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'AI / ML', 'Cloud & DevOps', 'Mobile & Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Featured Work</div>
          <h2 className="section-title">Projects & Systems Architecture</h2>
          <p className="section-subtitle">
            Explore production applications, LLM/RAG pipelines, cloud microservices, and network security systems built with modern engineering standards.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(59, 130, 246, 0.35)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Project Image Banner with Overlay */}
              <div
                style={{
                  height: '190px',
                  position: 'relative',
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%)',
                  }}
                />

                {/* Category & Stat Badges over Image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span className="badge" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)' }}>
                    {project.category}
                  </span>
                  {project.period && (
                    <span style={{ fontSize: '0.78rem', color: '#ffffff', background: 'rgba(0, 0, 0, 0.6)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(6px)' }}>
                      {project.period}
                    </span>
                  )}
                </div>

                {project.stats && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'var(--accent-cyan)',
                      fontWeight: 600,
                      background: 'rgba(10, 14, 23, 0.75)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Sparkles size={14} />
                    <span>{project.stats}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.3,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {project.title}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    fontWeight: 500,
                  }}
                >
                  {project.tagline}
                </p>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {project.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.86rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        color="var(--accent-blue)"
                        style={{ flexShrink: 0, marginTop: '0.15rem' }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'Fira Code',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.75rem',
                    marginTop: 'auto',
                  }}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <Github size={16} />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
