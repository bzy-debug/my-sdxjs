import RegexBase from './regex-base.js'

class RegexAlt extends RegexBase {
  private readonly regexs: RegexBase[]
  constructor (...regexs: RegexBase[]) {
    super()
    this.regexs = regexs
  }

  _match (text: string, start: number): number | null {
    for (const regex of this.regexs) {
      const next = regex._match(text, start)
      if (next != null) {
        return next
      }
    }
    return null
  }
}

export default (...regexs: RegexBase[]): RegexAlt => new RegexAlt(...regexs)
