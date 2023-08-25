import RegexBase from './regex-base.js'

class RegexSeq extends RegexBase {
  private readonly regexs: RegexBase[]
  constructor (...regexs: RegexBase[]) {
    super()
    this.regexs = regexs
  }

  _match (text: string, start: number): number | null {
    let next: number | null = start
    for (const regex of this.regexs) {
      if (next == null) return null
      next = regex._match(text, next)
    }
    return next
  }
}

export default (...regexs: RegexBase[]): RegexSeq => new RegexSeq(...regexs)
