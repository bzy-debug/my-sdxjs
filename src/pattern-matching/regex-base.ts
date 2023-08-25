class RegexBase {
  match (text: string): boolean {
    for (let i = 0; i < text.length; i += 1) {
      if (this._match(text, i) != null) {
        return true
      }
    }
    return false
  }

  _match (text: string, start: number): number | null {
    throw new Error('derived classes must override "_match"')
  }
}

export default RegexBase
