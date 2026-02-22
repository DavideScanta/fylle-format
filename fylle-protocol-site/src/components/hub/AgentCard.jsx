import { CATEGORY_COLORS } from '../../data/hubAgents';

const cardStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  cursor: 'default',
};

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '0.75rem',
};

const agentNameStyle = {
  fontSize: '1.05rem',
  fontWeight: 700,
  letterSpacing: -0.3,
  color: 'var(--text)',
};

const versionStyle = {
  fontFamily: 'var(--mono)',
  fontSize: '0.72rem',
  color: 'var(--text-dim)',
  flexShrink: 0,
  padding: '2px 8px',
  background: 'var(--bg-elevated)',
  borderRadius: 4,
  border: '1px solid var(--border)',
};

const authorStyle = {
  fontFamily: 'var(--mono)',
  fontSize: '0.75rem',
  color: 'var(--text-dim)',
};

const descStyle = {
  fontSize: '0.88rem',
  color: 'var(--text-muted)',
  lineHeight: 1.65,
  flex: 1,
};

const metaRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.78rem',
  fontFamily: 'var(--mono)',
  color: 'var(--text-dim)',
};

const pillContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.4rem',
};

const actionsStyle = {
  display: 'flex',
  gap: '0.5rem',
  borderTop: '1px solid var(--border)',
  paddingTop: '1rem',
  marginTop: 'auto',
};

const btnBaseStyle = {
  flex: 1,
  padding: '0.6rem 1rem',
  borderRadius: 8,
  fontSize: '0.82rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'var(--sans)',
  transition: 'all 0.2s',
  border: 'none',
  textAlign: 'center',
};

export default function AgentCard({ agent, onInspect, onDownload }) {
  return (
    <div
      className="hub-agent-card"
      style={cardStyle}
    >
      {/* Header */}
      <div>
        <div style={cardHeaderStyle}>
          <div style={agentNameStyle}>{agent.name}</div>
          <span style={versionStyle}>v{agent.version}</span>
        </div>
        <div style={authorStyle}>by @{agent.author}</div>
      </div>

      {/* Description */}
      <div style={descStyle}>{agent.description}</div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={metaRowStyle}>
          <span style={{ fontSize: '0.85rem' }}>&#x1F9E0;</span>
          <span style={{ color: 'var(--text-muted)' }}>{agent.model}</span>
        </div>
        <div style={metaRowStyle}>
          <span style={{ fontSize: '0.85rem' }}>&#x1F527;</span>
          <span style={{ color: 'var(--text-muted)' }}>{agent.tools.join(', ')}</span>
        </div>
        <div style={metaRowStyle}>
          <span style={{ fontSize: '0.85rem' }}>&#x1F6E1;&#xFE0F;</span>
          <span style={{ color: 'var(--text-muted)' }}>
            {agent.guardrails.autonomy} &middot; {agent.guardrails.rulesCount} guardrails
          </span>
        </div>
        <div style={metaRowStyle}>
          <span style={{ fontSize: '0.85rem' }}>&#x1F4E5;</span>
          <span style={{ color: 'var(--text-muted)' }}>{agent.downloads} downloads</span>
        </div>
      </div>

      {/* Category pills */}
      <div style={pillContainerStyle}>
        {agent.categories.map((cat) => (
          <span
            key={cat}
            style={{
              padding: '3px 10px',
              borderRadius: 100,
              fontSize: '0.7rem',
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              letterSpacing: 0.5,
              color: CATEGORY_COLORS[cat] || 'var(--text-muted)',
              background: `${CATEGORY_COLORS[cat] || '#888'}18`,
              border: `1px solid ${CATEGORY_COLORS[cat] || '#888'}30`,
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={actionsStyle}>
        <button
          onClick={() => onInspect(agent)}
          style={{
            ...btnBaseStyle,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          Inspect &#x2197;
        </button>
        <button
          onClick={() => onDownload(agent)}
          style={{
            ...btnBaseStyle,
            background: 'var(--accent)',
            color: 'var(--bg)',
          }}
        >
          Download &#x2B07;
        </button>
      </div>
    </div>
  );
}
