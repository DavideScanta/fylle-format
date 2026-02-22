import { Link } from 'react-router-dom'

const CARDS = [
  {
    title: 'Fylle Build',
    subtitle: 'The Program',
    description: 'The initiative behind portable AI agents. Our vision, pillars, and how we plan to make agent portability a public good.',
    to: '/build',
    accent: '#c8ff00',
    icon: '◆',
  },
  {
    title: '.fylle Protocol',
    subtitle: 'The Technology',
    description: 'The open standard to package, share, and deploy AI agents across any platform. Spec, format, and stack.',
    to: '/protocol',
    accent: '#60a5fa',
    icon: '{ }',
  },
  {
    title: 'Builder',
    subtitle: 'The Tool',
    description: 'Create .fylle agents visually. Define identity, model, prompt, tools, guardrails, and export — no code required.',
    to: '/builder',
    accent: '#a78bfa',
    icon: '⚡',
  },
  {
    title: 'Hub',
    subtitle: 'The Marketplace',
    description: 'Discover, inspect, and download portable AI agents built by the community. Deployable on any runtime.',
    to: '/hub',
    accent: '#34d399',
    icon: '◎',
    badge: 'Preview',
  },
]

export default function Home() {
  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav className="landing-nav">
        <a href="/" className="nav-logo">Fylle <span>Foundation</span></a>
        <div className="nav-links">
          <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub &rarr;</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <h1 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 700,
          letterSpacing: -1.5,
          lineHeight: 1.1,
          marginBottom: '2rem',
          position: 'relative',
        }}>
          .fylle <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>foundation</span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: 'var(--text-dim)',
          fontFamily: 'var(--mono)',
          letterSpacing: 0.5,
          marginBottom: '1rem',
          position: 'relative',
        }}>
          The vision of <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>fylle.ai</a>
        </p>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: 600,
          margin: '0 auto 4rem',
          position: 'relative',
        }}>
          Software is commodity.<br />
          Knowledge, skill &amp; distribution is where the real value is.
        </p>

        {/* 4 Cards Grid */}
        <div className="home-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
          maxWidth: 1000,
          width: '100%',
          position: 'relative',
        }}>
          {CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="home-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: '2rem 1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                textAlign: 'left',
                transition: 'border-color 0.3s, transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Icon */}
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: card.accent,
                lineHeight: 1,
              }}>
                {card.icon}
              </div>

              {/* Title + Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  margin: 0,
                  color: 'var(--text)',
                }}>
                  {card.title}
                </h3>
                {card.badge && (
                  <span style={{
                    fontSize: '0.55rem',
                    fontFamily: 'var(--mono)',
                    padding: '2px 6px',
                    borderRadius: 100,
                    background: `${card.accent}18`,
                    color: card.accent,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    border: `1px solid ${card.accent}30`,
                  }}>
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                color: card.accent,
                letterSpacing: 0.5,
                fontWeight: 600,
              }}>
                {card.subtitle}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}>
                {card.description}
              </p>

              {/* Arrow */}
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
                color: card.accent,
                marginTop: '0.5rem',
                fontWeight: 600,
              }}>
                Explore &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem 2rem',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          letterSpacing: 1,
        }}>
          Fylle Foundation &mdash; by{' '}
          <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Fylle</a>
          {' '}&mdash; 2025
        </p>
      </footer>
    </div>
  )
}
