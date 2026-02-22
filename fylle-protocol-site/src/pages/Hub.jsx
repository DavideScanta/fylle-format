import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { hubAgents } from '../data/hubAgents';
import CategoryFilter from '../components/hub/CategoryFilter';
import AgentGrid from '../components/hub/AgentGrid';
import InspectModal from '../components/hub/InspectModal';

async function downloadFylle(agent) {
  try {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    zip.file('manifest.yaml', agent.manifest);
    zip.file('agent.md', agent.systemPrompt);
    zip.file('guardrails.yaml', agent.guardrailsYaml);
    zip.file(
      'README.md',
      `# ${agent.name}\n\n${agent.description}\n\nVersion: ${agent.version}\nAuthor: ${agent.author}\n\nGenerated from fylle Hub \u2014 https://fylle-foundation.vercel.app/hub`
    );
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.id}.fylle`;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    alert('Download will be available soon. Join the waitlist to be notified!');
  }
}

export default function Hub() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [inspecting, setInspecting] = useState(null);

  const filtered = hubAgents.filter((agent) => {
    const matchCategory = category === 'All' || agent.categories.includes(category);
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      agent.name.toLowerCase().includes(q) ||
      agent.description.toLowerCase().includes(q) ||
      agent.categories.some((c) => c.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  const handleInspect = useCallback((agent) => setInspecting(agent), []);
  const handleCloseModal = useCallback(() => setInspecting(null), []);
  const handleDownload = useCallback((agent) => downloadFylle(agent), []);

  return (
    <div className="hub-page">
      {/* Nav */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/" className="nav-logo">
            Fylle <span>Build</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className="nav-link-item"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Protocol
          </Link>
          <Link
            to="/builder"
            className="nav-link-item"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Builder
          </Link>

          <Link
            to="/hub"
            className="nav-link-item"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Hub
            <span
              style={{
                fontSize: '0.6rem',
                fontFamily: 'var(--mono)',
                padding: '2px 6px',
                borderRadius: 100,
                background: 'var(--accent-dim)',
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Preview
            </span>
          </Link>
          <a
            href="https://github.com/DavideScanta/fylle-format"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            GitHub &rarr;
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: '10rem 2rem 3rem',
          textAlign: 'center',
          position: 'relative',
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <h1
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          The{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Fylle</em>{' '}
          Hub
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
            position: 'relative',
          }}
        >
          Discover portable AI agents.
          <br />
          Built by the community, deployable anywhere.
        </p>

        {/* Search bar */}
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <input
            type="text"
            placeholder="Search agents... e.g. content writer, compliance, pharma"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 44px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              color: 'var(--text)',
              fontSize: '0.9rem',
              fontFamily: 'var(--sans)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1rem',
              color: 'var(--text-dim)',
              pointerEvents: 'none',
            }}
          >
            &#x1F50D;
          </span>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <CategoryFilter active={category} onChange={setCategory} />
      </section>

      {/* Grid */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
        <AgentGrid agents={filtered} onInspect={handleInspect} onDownload={handleDownload} />
      </section>

      {/* Bottom CTA */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <section
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              letterSpacing: -1,
              marginBottom: '1rem',
            }}
          >
            Want to publish your agent?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Build it with the Fylle Builder, export as .fylle, and share it with the community.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.85rem 2rem',
                background: 'var(--accent)',
                color: 'var(--bg)',
                textDecoration: 'none',
                fontFamily: 'var(--mono)',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 8,
                letterSpacing: 1,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              Open the Builder &rarr;
            </Link>
            <a
              href="mailto:hello@fylle.ai?subject=fylle%20Hub%20waitlist"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.85rem 2rem',
                background: 'transparent',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--mono)',
                fontWeight: 500,
                fontSize: '0.85rem',
                borderRadius: 8,
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s',
              }}
            >
              Join the waitlist
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '2.5rem 2rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            letterSpacing: 1,
          }}
        >
          Fylle Build &mdash; by{' '}
          <a
            href="https://fylle.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Fylle
          </a>{' '}
          &mdash; 2025
        </p>
      </footer>

      {/* Inspect Modal */}
      {inspecting && (
        <InspectModal
          agent={inspecting}
          onClose={handleCloseModal}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
