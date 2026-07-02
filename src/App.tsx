import { useState, useMemo } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { effects } from './data/effects'
import type { EffectCategory } from './types'

const categories: { key: EffectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'button', label: 'Buttons' },
  { key: 'input', label: 'Inputs' },
  { key: 'loader', label: 'Loaders' },
  { key: 'text', label: 'Text' },
]

const categoryColors: Record<EffectCategory, string> = {
  button: '#3cefff',
  input: '#fc2f70',
  loader: '#f5a623',
  text: '#7b68ee',
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('CSS copied!', {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid #333',
      },
    })
  })
}

function EffectCard({ effect }: { effect: typeof effects[0] }) {
  const [showCode, setShowCode] = useState(false)
  const fullCode = `/* HTML */\n${effect.html}\n\n/* CSS */\n${effect.css}`

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = categoryColors[effect.category]
      e.currentTarget.style.boxShadow = `0 0 20px ${categoryColors[effect.category]}22`
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--border)'
      e.currentTarget.style.boxShadow = 'none'
    }}
    >
      {/* Preview */}
      <div
        onClick={() => copyToClipboard(fullCode)}
        style={{
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '120px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: effect.html }} />
      </div>

      {/* Info bar */}
      <div style={{
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: `${categoryColors[effect.category]}22`,
            color: categoryColors[effect.category],
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            {effect.category}
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
            {effect.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowCode(!showCode)
            }}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-secondary)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {showCode ? 'Hide' : 'Code'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              copyToClipboard(fullCode)
            }}
            style={{
              background: 'var(--accent)',
              border: 'none',
              color: '#000',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Code panel */}
      {showCode && (
        <div style={{
          borderTop: '1px solid var(--border)',
          maxHeight: '300px',
          overflow: 'auto',
        }}>
          <SyntaxHighlighter
            language="css"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8rem',
              borderRadius: 0,
              background: '#0d0d0d',
            }}
          >
            {fullCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<EffectCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filteredEffects = useMemo(() => {
    return effects.filter((e) => {
      const matchCategory = activeCategory === 'all' || e.category === activeCategory
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toaster position="bottom-center" />

      {/* Header */}
      <header style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}>
          <span style={{ color: 'var(--accent)' }}>CSS</span>FX
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
        }}>
          Beautifully simple click-to-copy CSS effects
        </p>
      </header>

      {/* Controls */}
      <div style={{
        padding: '1rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search effects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              fontSize: '0.9rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: `1px solid ${activeCategory === cat.key ? (cat.key === 'all' ? 'var(--accent)' : categoryColors[cat.key as EffectCategory] || 'var(--accent)') : 'var(--border)'}`,
                background: activeCategory === cat.key
                  ? (cat.key === 'all' ? 'var(--accent)' : categoryColors[cat.key as EffectCategory] || 'var(--accent)')
                  : 'transparent',
                color: activeCategory === cat.key ? '#000' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Effects grid */}
      <main style={{
        padding: '0 1.5rem 3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        flex: 1,
      }}>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          marginBottom: '1rem',
        }}>
          {filteredEffects.length} effect{filteredEffects.length !== 1 ? 's' : ''} — Click preview to copy
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {filteredEffects.map((effect) => (
            <EffectCard key={effect.id} effect={effect} />
          ))}
        </div>
        {filteredEffects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: 'var(--text-muted)',
          }}>
            No effects found.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
      }}>
        <a href="https://github.com/songdaochuanshu/cssfx" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {' · '}
        MIT License
      </footer>
    </div>
  )
}
