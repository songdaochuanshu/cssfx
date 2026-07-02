export type EffectCategory = 'button' | 'input' | 'loader' | 'text'

export interface Effect {
  id: string
  name: string
  category: EffectCategory
  css: string
  html: string
}
