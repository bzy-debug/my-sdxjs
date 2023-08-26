import { Node, Text, Element } from 'domhandler'
import Visitor from './visitor.js'

class Expander extends Visitor {
  result: string[]
  constructor (root: Node) {
    super(root)
    this.result = []
  }

  output (data: string): void {
    this.result.push(data)
  }

  getResult (): string {
    return this.result.join(' ')
  }

  showTag (node: Element, close: boolean): void {
    if (close) {
      this.output(`</${node.name}>`)
      return
    }
    this.output(`<${node.name}`)
    for (const name in node.attribs) {
      this.output(`${name}="${node.attribs[name]}"`)
    }
    this.output('>')
  }

  open (node: Node): boolean {
    if (node instanceof Text) {
      this.output(node.data)
      return false
    } else if (node instanceof Element) {
      this.showTag(node, false)
      return true
    }
    return false
  }

  close (node: Node): void {
    this.showTag(node as Element, true)
  }
}

export default Expander
