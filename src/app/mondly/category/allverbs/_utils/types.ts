export interface DictionaryQuiz {
  id: number
  ord?: string[]
  sols: Sol[]
  type: string
  lesson: number
  tokens?: Token[]
  wordID: number
  modifiers: number
  alternates: number[]
  tokensEqualSize?: boolean
  alts?: Alt[]
  quizSkipData?: QuizSkipData
  tokensPhonetic?: TokensPhonetic[]
  ordPhonetic?: string[]
  completeToken?: string
}

export interface Sol {
  key: string
  text: string
  phonetic?: string
  dictionary?: Dictionary[]
  phraseType?: number
  text_tokens?: TextToken[]
  phonetic_tokens?: PhoneticToken[]
  audio_updated_at?: number
  image?: string
  image_updated_at?: number
}

export interface Dictionary {
  raw: string
  translations: Translation[]
}

export interface Translation {
  text?: string
  type: string
  phonetic?: string
  id?: number
  conj?: Conj
  name?: Name
  tenseNames?: TenseNames
}

export interface Conj {
  fu: Fu[]
  pa: Pa[]
  pr: Pr[]
}

export interface Fu {
  m: M
  t: T
}

export interface M {
  text: string
}

export interface T {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Pa {
  m: M2
  t: T2
}

export interface M2 {
  text: string
}

export interface T2 {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Pr {
  m: M3
  t: T3
}

export interface M3 {
  text: string
}

export interface T3 {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Name {
  m: string
  t: string
  phonetic: string
}

export interface TenseNames {
  fu: string
  pa: string
  pr: string
}

export interface TextToken {
  raw: Raw
  linker: Linker
  prefix: Prefix
  suffix: Suffix
}

export interface Raw {
  text: string
  length: number
  location: number
}

export interface Linker {
  text: string
  length: number
  location: number
}

export interface Prefix {
  text: string
  length: number
  location: number
}

export interface Suffix {
  text: string
  length: number
  location: number
}

export interface PhoneticToken {
  raw: Raw2
  linker: Linker2
  prefix: Prefix2
  suffix: Suffix2
}

export interface Raw2 {
  text: string
  length: number
  location: number
}

export interface Linker2 {
  text: string
  length: number
  location: number
}

export interface Prefix2 {
  text: string
  length: number
  location: number
}

export interface Suffix2 {
  text: string
  length: number
  location: number
}

export interface Token {
  key: string
  raw?: Raw3
  text: string
  linker?: Linker3
  prefix?: Prefix3
  suffix?: Suffix3
  group?: number
  specialChar?: boolean
}

export interface Raw3 {
  text: string
  length: number
  location: number
}

export interface Linker3 {
  text: string
  length: number
  location: number
}

export interface Prefix3 {
  text: string
  length: number
  location: number
}

export interface Suffix3 {
  text: string
  length: number
  location: number
}

export interface Alt {
  key: string
  text: string
  phonetic?: string
  audio_updated_at: number
}

export interface QuizSkipData {
  ord: string[]
  sols: Sol2[]
  type: string
  tokens: Token2[]
  modifiers: number
  tokensEqualSize: boolean
}

export interface Sol2 {
  key: string
  text: string
  phonetic?: string
  dictionary?: Dictionary2[]
  phraseType?: number
  text_tokens?: TextToken2[]
  phonetic_tokens?: PhoneticToken2[]
  audio_updated_at: number
}

export interface Dictionary2 {
  raw: string
  translations: Translation2[]
}

export interface Translation2 {
  text?: string
  type: string
  phonetic: any
  id?: number
  conj?: Conj2
  name?: Name2
  tenseNames?: TenseNames2
}

export interface Conj2 {
  fu: Fu2[]
  pa: Pa2[]
  pr: Pr2[]
}

export interface Fu2 {
  m: M4
  t: T4
}

export interface M4 {
  text: string
}

export interface T4 {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Pa2 {
  m: M5
  t: T5
}

export interface M5 {
  text: string
}

export interface T5 {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Pr2 {
  m: M6
  t: T6
}

export interface M6 {
  text: string
}

export interface T6 {
  key: string
  text: string
  phonetic: string
  audio_updated_at: number
}

export interface Name2 {
  m: string
  t: string
  phonetic: string
}

export interface TenseNames2 {
  fu: string
  pa: string
  pr: string
}

export interface TextToken2 {
  raw: Raw4
  linker: Linker4
  prefix: Prefix4
  suffix: Suffix4
}

export interface Raw4 {
  text: string
  length: number
  location: number
}

export interface Linker4 {
  text: string
  length: number
  location: number
}

export interface Prefix4 {
  text: string
  length: number
  location: number
}

export interface Suffix4 {
  text: string
  length: number
  location: number
}

export interface PhoneticToken2 {
  raw: Raw5
  linker: Linker5
  prefix: Prefix5
  suffix: Suffix5
}

export interface Raw5 {
  text: string
  length: number
  location: number
}

export interface Linker5 {
  text: string
  length: number
  location: number
}

export interface Prefix5 {
  text: string
  length: number
  location: number
}

export interface Suffix5 {
  text: string
  length: number
  location: number
}

export interface Token2 {
  key: string
  raw: Raw6
  text: string
  linker: Linker6
  prefix: Prefix6
  suffix: Suffix6
}

export interface Raw6 {
  text: string
  length: number
  location: number
}

export interface Linker6 {
  text: string
  length: number
  location: number
}

export interface Prefix6 {
  text: string
  length: number
  location: number
}

export interface Suffix6 {
  text: string
  length: number
  location: number
}

export interface TokensPhonetic {
  key: string
  text: string
  group?: number
  raw?: Raw7
  linker?: Linker7
  prefix?: Prefix7
  suffix?: Suffix7
  specialChar?: boolean
}

export interface Raw7 {
  text: string
  length: number
  location: number
}

export interface Linker7 {
  text: string
  length: number
  location: number
}

export interface Prefix7 {
  text: string
  length: number
  location: number
}

export interface Suffix7 {
  text: string
  length: number
  location: number
}
