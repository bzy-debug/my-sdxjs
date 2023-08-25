import RegexBase from './regex-base.js'

class RegexStart extends RegexBase {
  _match (text: string, start: number): number | null {
    if (start === 0) return 0
    return null
  }
}

export default (): RegexStart => new RegexStart()
