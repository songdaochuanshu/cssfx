import { useState, useEffect } from 'react'
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
      style: {
        background: '#16161e',
        color: '#eeeef0',
        border: '1px solid rgba(60, 239, 255, 0.2)',
        borderRadius: '10px',
        fontSize: '0.85rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      },
    })
  })
}

function buildPreviewHtml(html: string, id: string): string {
  const trimmed = html.trim()
  if (/class="[^"]*"/.test(trimmed)) return trimmed
  if (trimmed.startsWith('<')) {
    const closeIdx = trimmed.indexOf('>')
    if (closeIdx === -1) return trimmed
    return trimmed.slice(0, closeIdx) + ` class="${id}"` + trimmed.slice(closeIdx)
  }
  return `<div class="${id}">${trimmed}</div>`
}

export default function EffectCard({ effect }: { effect: Effect }) {
  const [showCode, setShowCode] = useState(false)
  const fullCode = `/* HTML */\n${effect.html}\n\n/* CSS */\n${effect.css}`
  const color = categoryColors[effect.category]

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = effect.css
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [effect.css])

  return (
    <div
      className="effect-card"
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}33`
        e.currentTarget.style.boxShadow = `0 0 0 1px ${color}11, 0 8px 32px rgba(0,0,0,0.3), 0 0 60px ${color}08`
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Preview area */}
      <div
        onClick={() => copyToClipboard(fullCode)}
        style={{
          padding: '2.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '140px',
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}
        dangerouslySetInnerHTML={{ __html: buildPreviewHtml(effect.html, effect.id) }}
      />

      {/* Info bar */}
      <div style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            fontSize: '0.65rem',
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: `${color}12`,
            color: color,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            border: `1px solid ${color}18`,
          }}>
            {effect.category}
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {effect.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowCode(!showCode) }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              padding: '4px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {showCode ? 'Hide' : 'Code'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); copyToClipboard(fullCode) }}
            style={{
              background: color,
              border: 'none',
              color: '#000',
              padding: '4px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.15)'
              e.currentTarget.style.boxShadow = `0 0 12px ${color}44`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Code panel */}
      {showCode && (
        <div style={{ borderTop: '1px solid var(--border)', maxHeight: '300px', overflow: 'auto' }}>
          <SyntaxHighlighter
            language="css"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              borderRadius: 0,
              background: '#0d0d12',
            }}
          >
            {fullCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}
