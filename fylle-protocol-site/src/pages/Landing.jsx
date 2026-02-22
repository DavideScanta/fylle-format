import { Link } from 'react-router-dom'

const GH_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="nav-logo">Fylle <span>Foundation</span></Link>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#stack">Stack</a>
          <a href="#adopt">Who it's for</a>
          <Link to="/builder" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Builder</Link>
          <Link to="/hub" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Hub <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', padding: '2px 6px', borderRadius: 100, background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 700, letterSpacing: 0.5 }}>Preview</span></Link>
          <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub &rarr;</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot"></span>
          Open Source — Apache 2.0
        </div>

        <p className="hero-pre">The portable AI agent format</p>
        <h1>.fylle</h1>

        <p className="hero-sub">
          An open protocol to package, share, and deploy AI agents
          across any platform. Build once, run everywhere.
        </p>

        <p className="hero-tagline">
          Agents are portable. <em>Intelligence is not.</em>
        </p>

        <div className="hero-actions">
          <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {GH_ICON}
            View on GitHub
          </a>
          <Link to="/builder" className="btn btn-secondary">
            Build an agent →
          </Link>
        </div>
      </section>

      {/* Terminal */}
      <div className="terminal-section">
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <div className="terminal-title">Terminal — fylle-format</div>
          </div>
          <div className="terminal-body">
            <div><span className="comment"># Package your agent</span></div>
            <div><span className="cmd">$ fylle pack</span> <span className="string">./my-agent</span> <span className="flag">--output</span> <span className="string">content-curator.fylle</span></div>
            <div><span className="output">✓ manifest.yaml validated (v0.2)</span></div>
            <div><span className="output">✓ 2 tools: web_search (mcp), save_notes (mcp)</span></div>
            <div><span className="output">✓ 1 skill, 2 inputs, guardrails OK</span></div>
            <div><span className="success">→ content-curator.fylle (3.8 KB)</span></div>
            <div><br /></div>
            <div><span className="comment"># Share it</span></div>
            <div><span className="cmd">$ fylle push</span> <span className="string">content-curator.fylle</span></div>
            <div><span className="success">→ Published to hub.fylle.ai/agents/content-curator@1.0.0</span></div>
            <div><br /></div>
            <div><span className="comment"># Pull and run on any runtime</span></div>
            <div><span className="cmd">$ fylle pull</span> <span className="string">content-curator</span> <span className="flag">--runtime</span> <span className="string">langchain</span></div>
            <div><span className="success">→ Agent ready. Mapped 2/2 tools. Inputs: brand_context, topic.</span></div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="section" id="how">
        <div className="section-label">The Protocol</div>
        <h2>One file. Complete agent.</h2>
        <p className="section-desc">
          A <code style={{ color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--mono)' }}>.fylle</code> package contains everything needed to understand, transport, and run an AI agent — without vendor lock-in.
        </p>

        <div className="file-tree">
          <div><span className="folder">content-curator.fylle</span></div>
          <div>├── <span className="file">manifest.yaml</span> <span className="desc">— identity, version, model, inputs, output, tags</span></div>
          <div>├── <span className="file">agent.md</span> <span className="desc">— system prompt, tone, role, language</span></div>
          <div>├── <span className="folder">skills/</span> <span className="desc">— modular capabilities (prompt-based)</span></div>
          <div>│   └── <span className="file">research.yaml</span></div>
          <div>├── <span className="file">memory-schema.yaml</span> <span className="desc">— what to remember (not the data itself)</span></div>
          <div>├── <span className="file">guardrails.yaml</span> <span className="desc">— rules, limits, max autonomy</span></div>
          <div>└── <span className="file">README.md</span> <span className="desc">— human-readable documentation</span></div>
        </div>

        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-icon">📝</div>
            <h3>Declarative-first</h3>
            <p>Agents are described in YAML and Markdown, not code. Anyone can read, edit, and understand what an agent does.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🔌</div>
            <h3>MCP-native tools</h3>
            <p>Tools are declared with <code style={{ color: 'var(--accent)', fontFamily: 'var(--mono)' }}>protocol: "mcp"</code> — the runtime maps them to available servers. Graceful degradation for optional tools.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🧩</div>
            <h3>Composable inputs</h3>
            <p>Agents declare their inputs explicitly. The runtime knows what to inject — making agents composable in pipelines and multi-agent workflows.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">⚡</div>
            <h3>Runtime-agnostic</h3>
            <p>Works on LangChain, CrewAI, OpenClaw, or any platform that implements a simple adapter. No lock-in, ever.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🧠</div>
            <h3>Memory-portable</h3>
            <p>The memory schema travels with the agent, the data doesn't. The agent knows <em>what</em> to remember — the runtime decides <em>how</em>.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🔐</div>
            <h3>Secrets-safe</h3>
            <p>API keys and credentials are never stored in the package. Sensitive values are declared as requirements, configured at runtime.</p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section" id="stack">
        <div className="section-label">Position</div>
        <h2>The missing layer.</h2>
        <p className="section-desc">
          MCP connects agents to tools. A2A connects agents to agents. But nothing packages and transports the agent itself. Until now.
        </p>

        <div className="stack">
          <div className="stack-row highlighted">
            <div className="stack-cell stack-layer">Marketplace</div>
            <div className="stack-cell stack-standard">.fylle Hub</div>
            <div className="stack-cell stack-owner">Fylle (open source)</div>
          </div>
          <div className="stack-row highlighted">
            <div className="stack-cell stack-layer">Agent Package</div>
            <div className="stack-cell stack-standard">.fylle format</div>
            <div className="stack-cell stack-owner">Fylle (open source)</div>
          </div>
          <div className="stack-row">
            <div className="stack-cell stack-layer">Agent ↔ Agent</div>
            <div className="stack-cell"><span className="mono" style={{ color: 'var(--purple)' }}>A2A Protocol</span></div>
            <div className="stack-cell stack-owner">Google / Linux Foundation</div>
          </div>
          <div className="stack-row">
            <div className="stack-cell stack-layer">Agent ↔ Tool</div>
            <div className="stack-cell"><span className="mono" style={{ color: 'var(--blue)' }}>MCP</span></div>
            <div className="stack-cell stack-owner">Anthropic</div>
          </div>
          <div className="stack-row">
            <div className="stack-cell stack-layer">Runtime</div>
            <div className="stack-cell"><span className="mono" style={{ color: 'var(--text-dim)' }}>LangChain, CrewAI, OpenClaw, Fylle</span></div>
            <div className="stack-cell stack-owner">Various</div>
          </div>
          <div className="stack-row">
            <div className="stack-cell stack-layer">LLM</div>
            <div className="stack-cell"><span className="mono" style={{ color: 'var(--text-dim)' }}>Claude, GPT, Gemini, DeepSeek</span></div>
            <div className="stack-cell stack-owner">Various</div>
          </div>
        </div>

        <div className="comparison">
          <table>
            <thead>
              <tr>
                <th>Standard</th>
                <th>What it does</th>
                <th>What it doesn't</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="mono">MCP</td><td>Connects agents to external tools & data</td><td>Doesn't package or transport agents</td></tr>
              <tr><td className="mono">A2A</td><td>Enables agent-to-agent communication</td><td>Doesn't define or export agents</td></tr>
              <tr><td className="mono">Agent File (.af)</td><td>Exports/imports agents in Letta</td><td>Tied to one ecosystem</td></tr>
              <tr><td className="mono">ADL</td><td>Declares agent definitions</td><td>No memory, skills, or runtime</td></tr>
              <tr className="hl"><td className="mono">.fylle</td><td>Full portable agent — tools, skills, memory, inputs</td><td>Open, universal, runtime-agnostic</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section" id="adopt">
        <div className="section-label">Adopt</div>
        <h2>Who benefits.</h2>
        <p className="section-desc">
          The <code style={{ color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--mono)' }}>.fylle</code> format is designed to create value across the entire AI agent ecosystem — not just inside one platform.
        </p>

        <div className="adopters-grid">
          <div className="adopter-card">
            <div className="adopter-label">Indie Developers</div>
            <h3>Build once, sell anywhere</h3>
            <p>Package your agent, publish it to the Hub, sell or share it. You're never locked into a single framework or marketplace.</p>
          </div>
          <div className="adopter-card">
            <div className="adopter-label">Companies</div>
            <h3>Standardize your agents</h3>
            <p>Define how your team builds agents internally. Swap runtimes without rewriting. Audit and version every agent like code.</p>
          </div>
          <div className="adopter-card">
            <div className="adopter-label">Frameworks</div>
            <h3>Import/export as a feature</h3>
            <p>LangChain, CrewAI, or any runtime can offer <code style={{ color: 'var(--accent)', fontFamily: 'var(--mono)' }}>.fylle</code> import/export. Lower the barrier to entry. Attract more users.</p>
          </div>
          <div className="adopter-card">
            <div className="adopter-label">Marketplaces</div>
            <h3>A standard listing format</h3>
            <p>Like npm for packages or Docker Hub for images. A universal format to list, discover, and distribute AI agents.</p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="section" id="why">
        <div className="section-label">Why</div>
        <h2>Open-source the protocol.<br />Monetize the platform.</h2>

        <div className="why-grid">
          <div className="why-block">
            <h3>The Protocol</h3>
            <h4>Free. Open. For everyone.</h4>
            <p>
              The <code style={{ color: 'var(--accent)', fontFamily: 'var(--mono)' }}>.fylle</code> format is Apache 2.0.
              Use it to package, share, and deploy agents across any platform.
              No fees, no lock-in, no strings attached.
              Agent portability is a public good.
            </p>
          </div>
          <div className="why-block">
            <h3>The Platform</h3>
            <h4>Where agents compound.</h4>
            <p>
              Fylle the product is the execution layer where agents accumulate
              permanent context and improve through feedback loops. Every interaction
              compounds. Your agent on day 100 is fundamentally smarter than on day 1.
              Agents are portable — the intelligence they build is not.
            </p>
          </div>
        </div>
      </section>

      {/* Big tagline */}
      <div className="big-tagline">
        <p>
          Build your agent anywhere.<br />
          Run it everywhere.<br />
          When you want agents that <em>compound</em> →<br />
          run them on Fylle.
        </p>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Start building.</h2>
          <p>
            The spec is open. The CLI works. The first agents are live.<br />
            Join the community shaping how AI agents move.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/DavideScanta/fylle-format" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {GH_ICON}
              GitHub Repository
            </a>
            <Link to="/builder" className="btn btn-secondary">
              Agent Builder →
            </Link>
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
          <a href="https://github.com/DavideScanta/fylle-format/blob/main/spec/SPECIFICATION.md" target="_blank" rel="noopener noreferrer">Spec</a>
          <Link to="/builder">Builder</Link>
          <Link to="/hub">Hub</Link>
          <a href="https://fylle.ai" target="_blank" rel="noopener noreferrer">Platform</a>
          <a href="https://x.com/fylle_ai" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  )
}
