import { useState, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { effects } from './data/effects'
import type { EffectCategory } from './types'
import EffectCard from './components/EffectCard'

const categories: { key: EffectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'button', label: 'Buttons' },
  { key: 'input', label: 'Inputs' },
  { key: 'loader', label: 'Loaders' },
  { key: 'text', label: 'Text' },
]

const categoryColors: Record<EffectCategory, string> = {
  button: '#3cefff', input: '#fc2f70', loader: '#f5a623', text: '#7b68ee',
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
        padding: '3rem 1.5rem 2.5rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(circle, rgba(60,239,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '0.6rem',
          position: 'relative',
        }}>
          <span style={{ background: 'linear-gradient(135deg, #3cefff, #7b68ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CSS</span>
          <span style={{ color: 'var(--text-primary)' }}>FX</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          fontWeight: 400,
          position: 'relative',
        }}>
          Beautifully simple click-to-copy CSS effects
        </p>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          marginTop: '0.5rem',
          position: 'relative',
        }}>
          {effects.length} effects across {categories.length - 1} categories
        </p>
      </header>

      {/* Controls */}
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', fontSize: '0.85rem', pointerEvents: 'none',
          }}>\u2315</span>
          <input
            type="text"
            placeholder="Search effects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.2rem',
              fontSize: '0.9rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'all 0.25s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(60, 239, 255, 0.3)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(60, 239, 255, 0.06)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key
            const color = cat.key === 'all' ? 'var(--accent)' : categoryColors[cat.key as EffectCategory]
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${isActive ? color : 'var(--border)'}`,
                  background: isActive ? `${color}15` : 'transparent',
                  color: isActive ? color : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border-hover)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Effects grid */}
      <main style={{
        padding: '0.5rem 1.5rem 4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        flex: 1,
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
          {filteredEffects.length} effect{filteredEffects.length !== 1 ? 's' : ''} \u2014 Click preview to copy
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filteredEffects.map((effect) => (<EffectCard key={effect.id} effect={effect} />))}
        </div>
        {filteredEffects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No effects found.</p>
            <p style={{ fontSize: '0.85rem' }}>Try a different search or category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontSize: '0.78rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <a href="https://github.com/songdaochuanshu/cssfx" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>GitHub</a>
        <span style={{ opacity: 0.4 }}>\u00b7</span>
        <span>MIT License</span>
      </footer>
    </div>
  )
}
