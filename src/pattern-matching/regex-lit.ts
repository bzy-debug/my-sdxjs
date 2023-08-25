import RegexBase from './regex-base.js'

class RegexLit extends RegexBase {
  private readonly chars: string
  constructor (chars: string) {
    super()
    this.chars = chars
  }

  _match (text: string, start: number): number | null {
    const nextIndex = start + this.chars.length
    const actual = text.slice(start, nextIndex)
    if (this.chars === actual) return nextIndex
    return null
  }
}

export default (chars: string): RegexLit => new RegexLit(chars)
