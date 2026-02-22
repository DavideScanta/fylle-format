import { CATEGORY_COLORS } from '../../data/hubAgents';

const ALL_CATEGORIES = ['All', ...Object.keys(CATEGORY_COLORS)];

const filterBarStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
};

export default function CategoryFilter({ active, onChange }) {
  return (
    <div style={filterBarStyle}>
      {ALL_CATEGORIES.map((cat) => {
        const isActive = active === cat;
        const color = cat === 'All' ? 'var(--accent)' : (CATEGORY_COLORS[cat] || 'var(--text-muted)');
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 100,
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              cursor: 'pointer',
              border: isActive ? `1px solid ${color}` : '1px solid var(--border)',
              background: isActive ? `${color}18` : 'var(--bg-elevated)',
              color: isActive ? color : 'var(--text-dim)',
              transition: 'all 0.2s',
              letterSpacing: 0.3,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
