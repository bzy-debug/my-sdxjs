import assert from 'assert'
import { Node, NodeWithChildren } from 'domhandler'

class Visitor {
  private readonly root: Node
  constructor (root: Node) {
    this.root = root
  }

  walk (node = this.root): void {
    if (this.open(node)) {
      assert(node instanceof NodeWithChildren, 'Open node must have children')
      node.children.forEach(child => {
        this.walk(child as Node)
      })
    }
    this.close(node)
  }

  open (node: Node): boolean {
    assert(false,
      'Must implement "open"')
  }

  close (node: Node): void {
    assert(false,
      'Must implement "close"')
  }
}

export default Visitor
