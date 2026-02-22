import AgentCard from './AgentCard';

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.25rem',
  maxWidth: 1100,
  margin: '0 auto',
};

export default function AgentGrid({ agents, onInspect, onDownload }) {
  if (agents.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text-dim)',
        fontFamily: 'var(--mono)',
        fontSize: '0.9rem',
      }}>
        No agents found matching your search.
      </div>
    );
  }

  return (
    <div className="hub-agent-grid" style={gridStyle}>
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onInspect={onInspect}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
