import { AssertionError } from 'assert'
import caller from 'caller'

type Todo = [string, () => void | Promise<void>]

class Hope {
  private readonly _todos: Todo[] = []
  private readonly _passes: string[] = []
  private readonly _fails: string[] = []
  private readonly _errors: string[] = []
  private readonly _tagMap: Map<string, Todo[]> = new Map()

  constructor () {
    return this
  }

  private _cases (): Array<[string, string[]]> {
    return [
      ['passes', this._passes],
      ['fails', this._fails],
      ['errors', this._errors]
    ]
  }

  terse (): string {
    return this._cases()
      .map(([title, results]) => `${title}: ${results.length}`)
      .join(' ')
  }

  verbose (): string {
    let report = ''
    let prefix = ''
    for (const [title, results] of this._cases()) {
      report += `${prefix}${title}:`
      prefix = '\n'
      for (const r of results) {
        report += `${prefix}  ${r}`
      }
    }
    return report
  }

  test (comment: string, callback: () => void | Promise<void>, tags: string[]): void {
    const todo: Todo = [`${caller()}::${comment}`, callback]
    this._todos.push(todo)
    tags.forEach(tag => {
      if (this._tagMap.has(tag)) {
        this._tagMap.get(tag)?.push(todo)
      } else {
        this._tagMap.set(tag, [todo])
      }
    })
  }

  async run (tag?: string): Promise<void> {
    const todos = tag !== undefined ? this._tagMap.get(tag) : this._todos
    if (todos === undefined) return
    for (const [comment, test] of todos) {
      try {
        const res = test()
        if (typeof res === 'object') {
          await res
        }
        this._passes.push(comment)
      } catch (err) {
        if (err instanceof AssertionError) {
          this._fails.push(comment)
        } else {
          this._errors.push(comment)
        }
      }
    }
  }
}

function assertApproxEqual (left: number, right: number, message: string, tolerance: number = 0.1): void {
  if (Math.abs(left - right) > tolerance) throw new Error(message)
}

export default new Hope()

export { assertApproxEqual }
