import RegexBase from './regex-base.js'

class RegexSeq extends RegexBase {
  private readonly regexs: RegexBase[]
  constructor (...regexs: RegexBase[]) {
    super()
    this.regexs = regexs
  }

  _match (text: string, start: number): number | null {
    return null
  }
}

export default (...regexs: RegexBase[]): RegexSeq => new RegexSeq(...regexs)
