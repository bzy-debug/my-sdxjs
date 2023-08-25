const SIMPLE = {
  '*': 'Any',
  '|': 'Alt',
  '(': 'GroupStart',
  ')': 'GroupEnd'
} as const

type Reserved = keyof (typeof SIMPLE)

interface ReservedToken {
  kind: (typeof SIMPLE)[Reserved] | 'End' | 'Start'
  loc: number
}

interface LitToken {
  kind: 'Lit'
  loc: number
  value: string
}

type Token = ReservedToken | LitToken

function combineOrPush (soFar: Token[], char: string, i: number): void {
  const topToken = soFar[soFar.length - 1]
  if (soFar.length === 0 || topToken.kind !== 'Lit') {
    soFar.push({ kind: 'Lit', loc: i, value: char })
  } else {
    topToken.value += char
  }
}

function tokenize (text: string): Token[] {
  const result: Token[] = []
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char in SIMPLE) {
      result.push({ kind: SIMPLE[char as Reserved], loc: i })
    } else if (char === '^') {
      if (i === 0) result.push({ kind: 'Start', loc: i })
      else combineOrPush(result, char, i)
    } else if (char === '$') {
      if (i === text.length - 1) result.push({ kind: 'End', loc: i })
      else combineOrPush(result, char, i)
    } else {
      combineOrPush(result, char, i)
    }
  }
  return result
}

export default tokenize
