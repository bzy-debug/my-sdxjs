import assert from 'assert'
import { Element } from 'domhandler'

export default function select (root: Element, selector: string): Element | null {
  const selectors = selector.split(' ').filter(s => s.length > 0)
  return firstMatch(root, selectors)
}

function firstMatch (node: Element, selectors: string[]): Element | null {
  assert(selectors.length > 0, 'Require selector(s)')
  if (node.type !== 'tag') return null

  if (matchHere(node, selectors[0])) {
    if (selectors.length === 1) {
      return node
    }

    return firstChildMatch(node, selectors.slice(1))
  }

  return firstChildMatch(node, selectors)
}

function firstChildMatch (node: Element, selectors: string[]): Element | null {
  for (const child of node.childNodes) {
    const match = firstMatch(child as Element, selectors)
    if (match != null) return match
  }
  return null
}

function matchHere (node: Element, selector: string): boolean {
  let name = null
  let id = null
  let cls = null
  if (selector.includes('#')) [name, id] = selector.split('#')
  else if (selector.includes('.')) [name, cls] = selector.split('.')
  else name = selector

  return node.tagName === name &&
  (id == null || (id === node.attribs.id)) &&
  (cls == null || (cls === node.attribs.class))
}
