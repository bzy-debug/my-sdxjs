import RegexBase from './regex-base.js'

class RegexAlt extends RegexBase {
  private readonly regexs: RegexBase[]
  constructor (...regexs: RegexBase[]) {
    super()
    this.regexs = regexs
  }

  _match (text: string, start: number): number | null {
    return null
  }
}

export default (...regexs: RegexBase[]): RegexAlt => new RegexAlt(...regexs)
