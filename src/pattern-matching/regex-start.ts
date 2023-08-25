import RegexBase from './regex-base.js'

class RegexStart extends RegexBase {
  _match (text: string, start: number): number | null {
    return null
  }
}

export default (): RegexStart => new RegexStart()
