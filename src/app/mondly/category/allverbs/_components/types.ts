export interface VerbConjugation {
  m: {
    text: string
  }
  t: {
    key: string
    text: string
    phonetic: string
    audio_updated_at: number
  }
}

export interface Verb {
  id: number
  name: {
    m: string
    t: string
    phonetic: string
  }
  conj: {
    pr: VerbConjugation[] // present
    pa: VerbConjugation[] // past
    fu: VerbConjugation[] // future
  }
  tenseNames: {
    pr: string
    pa: string
    fu: string
  }
}

export type TenseType = "pr" | "pa" | "fu"
