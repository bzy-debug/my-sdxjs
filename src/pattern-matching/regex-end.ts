import RegexBase from './regex-base.js'

class RegexEnd extends RegexBase {
  _match (text: string, start: number): number | null {
    if (start >= text.length) return start
    return null
  }
}

export default (): RegexEnd => new RegexEnd()
