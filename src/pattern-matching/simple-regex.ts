class Regex {
  #pattern: string
  #text: string = ''
  #iText = 0
  #iPattern = 0

  constructor (pattern: string) {
    this.#pattern = pattern
  }

  match (text: string): boolean {
    this.#text = text
    this.#iText = 0

    if (this.#pattern[0] === '^') {
      this.#iPattern = 1
      return this.#matchHere()
    }

    do {
      this.#iPattern = 0
      if (this.#matchHere()) return true
      this.#iText++
    } while (this.#iText < this.#text.length)

    return false
  }

  #matchHere (): boolean {
    if (this.#iPattern === this.#pattern.length) {
      return true
    }

    if (this.#iPattern === this.#pattern.length - 1 &&
      (this.#pattern[this.#iPattern] === '$') &&
      (this.#iText === this.#text.length)) {
      return true
    }

    if (this.#iPattern + 1 < this.#pattern.length && this.#pattern[this.#iPattern + 1] === '*') {
      const char = this.#pattern[this.#iPattern]
      while (this.#iText < this.#text.length && this.#text[this.#iText] === char) {
        this.#iText++
      }
      this.#iPattern += 2
      while (this.#iPattern < this.#pattern.length && this.#pattern[this.#iPattern] === char) {
        this.#iPattern++
      }
      return this.#matchHere()
    }

    if (this.#pattern[this.#iPattern] === '.' || this.#pattern[this.#iPattern] === this.#text[this.#iText]) {
      this.#iPattern++
      this.#iText++
      return this.#matchHere()
    }

    return false
  }
}

function main (): void {
  const tests: Array<[string, string, boolean]> = [
    ['a', 'a', true],
    ['b', 'a', false],
    ['a', 'ab', true],
    ['b', 'ab', true],
    ['ab', 'ba', false],
    ['^a', 'ab', true],
    ['^b', 'ab', false],
    ['a$', 'ab', false],
    ['a$', 'ba', true],
    ['a*', '', true],
    ['a*', 'baac', true],
    ['ab*c', 'ac', true],
    ['ab*c', 'abc', true],
    ['ab*c', 'abbbc', true],
    ['ab*c', 'abxc', false],
    ['a*ab', 'aab', true]
  ]
  tests.forEach(([regexp, text, expected]) => {
    const actual = new Regex(regexp).match(text)
    const result = (actual === expected) ? 'pass' : 'fail'
    console.log(`"${regexp}" X "${text}": ${result}`)
  })
}

main()
