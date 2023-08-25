import RegexBase from './regex-base.js'

class RegexLit extends RegexBase {
  private readonly chars: string
  constructor (chars: string) {
    super()
    this.chars = chars
  }

  _match (text: string, start: number): number | null {
    return null // FIXME
  }
}

export default (chars: string): RegexLit => new RegexLit(chars)
