import { Link } from 'react-router-dom'

export default function Build() {
  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="nav-logo">Fylle <span>Foundation</span></Link>
        <div className="nav-links">
          <Link to="/protocol" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Protocol</Link>
          <Link to="/builder" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Builder</Link>
          <Link to="/hub" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Hub <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', padding: '2px 6px', borderRadius: 100, background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 700, letterSpacing: 0.5 }}>Preview</span></Link>
          <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub &rarr;</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot"></span>
          The Initiative
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
          Fylle <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Build</em>
        </h1>

        <p className="hero-sub">
          The open program to make AI agent portability a public good.<br />
          Protocol. Tools. Marketplace. Community.
        </p>
      </section>

      {/* Vision */}
      <section className="section">
        <div className="section-label">Vision</div>
        <h2>Agents should be portable.<br />Intelligence should compound.</h2>
        <p className="section-desc" style={{ maxWidth: 640 }}>
          Today, every AI agent is trapped inside the platform that built it. Different frameworks, different formats, different runtimes.
          Fylle Build exists to change that &mdash; by creating an open ecosystem where agents move freely and grow smarter over time.
        </p>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="section-label">The Four Pillars</div>
        <h2>Everything you need to build portable agents.</h2>

        <div className="adopters-grid">
          <Link to="/protocol" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="adopter-card" style={{ cursor: 'pointer' }}>
              <div className="adopter-label" style={{ color: '#60a5fa' }}>.fylle Protocol</div>
              <h3>The open standard</h3>
              <p>
                The technology layer. An open format (Apache 2.0) to package agents as portable, inspectable, runtime-agnostic bundles.
                YAML + Markdown. No code. No vendor lock-in.
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>Read the spec &rarr;</span>
            </div>
          </Link>

          <Link to="/builder" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="adopter-card" style={{ cursor: 'pointer' }}>
              <div className="adopter-label" style={{ color: '#a78bfa' }}>Fylle Builder</div>
              <h3>The creation tool</h3>
              <p>
                A visual builder to design agents step by step: identity, model, prompt, tools, guardrails, memory.
                Export as .fylle with one click.
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>Open Builder &rarr;</span>
            </div>
          </Link>

          <Link to="/hub" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="adopter-card" style={{ cursor: 'pointer' }}>
              <div className="adopter-label" style={{ color: '#34d399' }}>Fylle Hub</div>
              <h3>The marketplace</h3>
              <p>
                Discover agents built by the community. Inspect their manifest, prompt, and guardrails.
                Download and deploy on any runtime.
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>Browse agents &rarr;</span>
            </div>
          </Link>

          <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="adopter-card" style={{ cursor: 'pointer' }}>
              <div className="adopter-label" style={{ color: 'var(--accent)' }}>Fylle Platform</div>
              <h3>Where agents compound</h3>
              <p>
                The execution layer. Agents accumulate permanent context and improve through feedback loops.
                Your agent on day 100 is fundamentally smarter than on day 1.
              </p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>Learn more &rarr;</span>
            </div>
          </a>
        </div>
      </section>

      {/* Open Source vs Platform */}
      <section className="section">
        <div className="section-label">Model</div>
        <h2>Open-source the protocol.<br />Monetize the platform.</h2>

        <div className="why-grid">
          <div className="why-block">
            <h3>The Protocol</h3>
            <h4>Free. Open. For everyone.</h4>
            <p>
              The .fylle format, the Builder, and the Hub are all open source under Apache 2.0.
              Use them to package, share, and deploy agents across any platform.
              No fees, no lock-in, no strings attached. Agent portability is a public good.
            </p>
          </div>
          <div className="why-block">
            <h3>The Platform</h3>
            <h4>Where agents compound.</h4>
            <p>
              Fylle the product is the execution layer where agents accumulate permanent context
              and improve through feedback loops. Every interaction compounds.
              Agents are portable &mdash; the intelligence they build is not.
            </p>
          </div>
        </div>
      </section>

      {/* Big tagline */}
      <div className="big-tagline">
        <p>
          Build your agent anywhere.<br />
          Run it everywhere.<br />
          When you want agents that <em>compound</em> &rarr;<br />
          run them on Fylle.
        </p>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Join the movement.</h2>
          <p>
            The protocol is open. The tools are ready. The first agents are live.<br />
            Join the community shaping how AI agents move.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              GitHub Repository
            </a>
            <a href="mailto:hello@fylle.ai?subject=Fylle%20Build" className="btn btn-secondary">
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-brand">
          Fylle Foundation &mdash; by <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Fylle</a>
        </div>
        <div className="footer-links">
          <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link to="/protocol">Protocol</Link>
          <Link to="/builder">Builder</Link>
          <Link to="/hub">Hub</Link>
          <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer">Platform</a>
          <a href="https://x.com/fylle_ai" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  )
}
