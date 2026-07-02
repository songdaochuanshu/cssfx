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
      <header style={{ padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--accent)' }}>CSS</span>FX
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Beautifully simple click-to-copy CSS effects
        </p>
      </header>
      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <input type="text" placeholder="Search effects..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              style={{ padding: '0.4rem 1rem', borderRadius: '20px',
                border: `1px solid ${activeCategory === cat.key ? (cat.key === 'all' ? 'var(--accent)' : categoryColors[cat.key as EffectCategory] || 'var(--accent)') : 'var(--border)'}`,
                background: activeCategory === cat.key ? (cat.key === 'all' ? 'var(--accent)' : categoryColors[cat.key as EffectCategory] || 'var(--accent)') : 'transparent',
                color: activeCategory === cat.key ? '#000' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <main style={{ padding: '0 1.5rem 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          {filteredEffects.length} effect{filteredEffects.length !== 1 ? 's' : ''} \u2014 Click preview to copy
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {filteredEffects.map((effect) => (<EffectCard key={effect.id} effect={effect} />))}
        </div>
        {filteredEffects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No effects found.</div>
        )}
      </main>
      <footer style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <a href="https://github.com/songdaochuanshu/cssfx" target="_blank" rel="noopener noreferrer">GitHub</a>{' \u00b7 '}MIT License
      </footer>
    </div>
  )
}
