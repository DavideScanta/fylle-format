import { useState, useEffect, useCallback } from 'react';

const TABS = [
  { id: 'manifest', label: 'Manifest', file: 'manifest.yaml' },
  { id: 'prompt', label: 'System Prompt', file: 'agent.md' },
  { id: 'guardrails', label: 'Guardrails', file: 'guardrails.yaml' },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightYaml(code) {
  return code
    .split('\n')
    .map((line) => {
      const escaped = escapeHtml(line);
      // Comments
      if (line.trimStart().startsWith('#')) {
        return `<span class="hl-comment">${escaped}</span>`;
      }
      // Process on raw line, build highlighted output
      let result = escaped;
      // Strings in double quotes (must run before keys to avoid conflicts)
      result = result.replace(/&quot;([^&]*)&quot;/g, '<span class="hl-string">"$1"</span>');
      result = result.replace(/"([^"<]*)"/g, '<span class="hl-string">"$1"</span>');
      // Keys (words followed by colon at start of line)
      result = result.replace(/^(\s*)([\w_-]+)(:)/gm, '$1<span class="hl-key">$2</span><span class="hl-colon">$3</span>');
      // Booleans and numbers after colon
      result = result.replace(/(:\s+)(true|false|null)\b/g, '$1<span class="hl-value">$2</span>');
      result = result.replace(/(:\s+)(\d+\.?\d*)\b/g, '$1<span class="hl-value">$2</span>');
      // List items
      result = result.replace(/^(\s*)(- )/gm, '$1<span class="hl-list">$2</span>');
      return result;
    })
    .join('\n');
}

function highlightMarkdown(code) {
  return code
    .split('\n')
    .map((line) => {
      const escaped = escapeHtml(line);
      // Headers
      if (line.trimStart().startsWith('#')) {
        return `<span class="hl-heading">${escaped}</span>`;
      }
      let result = escaped;
      // Bold
      result = result.replace(/\*\*([^*]+)\*\*/g, '<span class="hl-bold">**$1**</span>');
      // Inline code
      result = result.replace(/`([^`]+)`/g, '<span class="hl-code">`$1`</span>');
      // List items
      result = result.replace(/^(\s*)(- )/gm, '$1<span class="hl-list-md">$2</span>');
      // Numbered items
      result = result.replace(/^(\s*)(\d+\. )/gm, '$1<span class="hl-list-md">$2</span>');
      return result;
    })
    .join('\n');
}

export default function InspectModal({ agent, onClose, onDownload }) {
  const [activeTab, setActiveTab] = useState('manifest');
  const [copied, setCopied] = useState(false);

  const getContent = () => {
    switch (activeTab) {
      case 'manifest': return agent.manifest;
      case 'prompt': return agent.systemPrompt;
      case 'guardrails': return agent.guardrailsYaml;
      default: return '';
    }
  };

  const getHighlighted = () => {
    const content = getContent();
    if (activeTab === 'prompt') return highlightMarkdown(content);
    return highlightYaml(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="hub-inspect-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Inspect ${agent.name}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        animation: 'hubModalFadeIn 0.25s ease both',
        padding: '2rem',
      }}
    >
      <div
        className="hub-inspect-modal"
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: '85vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'hubModalSlideUp 0.3s ease both',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{agent.name}</span>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                padding: '2px 8px',
                background: 'var(--bg-elevated)',
                borderRadius: 4,
                border: '1px solid var(--border)',
              }}>
                v{agent.version}
              </span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
              by @{agent.author}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '1.3rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 6,
              transition: 'color 0.2s',
            }}
          >
            &#x2715;
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          padding: '0.75rem 1.5rem 0',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.6rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: 'var(--mono)',
                cursor: 'pointer',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                background: 'transparent',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-dim)',
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.25rem 1.5rem',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            marginBottom: '0.75rem',
            letterSpacing: 0.5,
          }}>
            # {TABS.find((t) => t.id === activeTab)?.file}
          </div>
          <pre
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.78rem',
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}
            dangerouslySetInnerHTML={{ __html: getHighlighted() }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '0.75rem',
          flexShrink: 0,
        }}>
          <button
            onClick={copyToClipboard}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid var(--border)',
              background: copied ? 'var(--accent-dim)' : 'transparent',
              color: copied ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: 'var(--mono)',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copied \u2713' : 'Copy to clipboard'}
          </button>
          <button
            onClick={() => onDownload(agent)}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--mono)',
              transition: 'all 0.2s',
            }}
          >
            Download .fylle &#x2B07;
          </button>
        </div>
      </div>
    </div>
  );
}
