import RegexBase from './regex-base.js'

class RegexEnd extends RegexBase {
  _match (text: string, start: number): number | null {
    return null
  }
}

export default (): RegexEnd => new RegexEnd()
