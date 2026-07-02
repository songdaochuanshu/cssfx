import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Effect } from '../types'

const categoryColors: Record<string, string> = {
  button: '#3cefff',
  input: '#fc2f70',
  loader: '#f5a623',
  text: '#7b68ee',
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('CSS copied!', {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' },
    })
  })
}

function buildPreviewHtml(html: string, id: string): string {
  const trimmed = html.trim()
  const classRegex = /class="[^"]*"/
  if (classRegex.test(trimmed)) return trimmed
  if (trimmed.startsWith('<')) {
    const closeIdx = trimmed.indexOf('>')
    if (closeIdx === -1) return trimmed
    return trimmed.slice(0, closeIdx) + ` class="${id}"` + trimmed.slice(closeIdx)
  }
  return `<div class="${id}">${trimmed}</div>`
}

export default function EffectCard({ effect }: { effect: Effect }) {
  const [showCode, setShowCode] = useState(false)
  const styleRef = useRef<HTMLStyleElement | null>(null)
  const fullCode = `/* HTML */\n${effect.html}\n\n/* CSS */\n${effect.css}`

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = effect.css
    document.head.appendChild(style)
    styleRef.current = style
    return () => { style.remove() }
  }, [effect.css])

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const c = categoryColors[effect.category]
        e.currentTarget.style.borderColor = c
        e.currentTarget.style.boxShadow = `0 0 20px ${c}22`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
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
        dangerouslySetInnerHTML={{ __html: buildPreviewHtml(effect.html, effect.id) }}
      />
      <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px',
            backgroundColor: `${categoryColors[effect.category]}22`,
            color: categoryColors[effect.category],
            fontWeight: 600, textTransform: 'uppercase',
          }}>{effect.category}</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{effect.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowCode(!showCode) }}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', padding: '4px 10px',
              borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >{showCode ? 'Hide' : 'Code'}</button>
          <button
            onClick={(e) => { e.stopPropagation(); copyToClipboard(fullCode) }}
            style={{
              background: 'var(--accent)', border: 'none', color: '#000',
              padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
              fontSize: '0.75rem', fontWeight: 600, transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >Copy</button>
        </div>
      </div>
      {showCode && (
        <div style={{ borderTop: '1px solid var(--border)', maxHeight: '300px', overflow: 'auto' }}>
          <SyntaxHighlighter language="css" style={oneDark}
            customStyle={{ margin: 0, padding: '1rem', fontSize: '0.8rem', borderRadius: 0, background: '#0d0d0d' }}
          >{fullCode}</SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}
