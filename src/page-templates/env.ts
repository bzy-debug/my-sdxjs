interface Frame {
  [index: string]: string
}

class Env {
  private readonly stack: Frame[]

  constructor (frame: Frame) {
    this.stack = []
    this.stack.push(frame)
  }

  push (frame: Frame): void {
    this.stack.push(frame)
  }

  find (name: string): string | undefined {
    for (const frame of this.stack) {
      if (name in frame) {
        return frame[name]
      }
    }
    return undefined
  }

  toString (): string {
    return JSON.stringify(this.stack)
  }
}

export default Env
