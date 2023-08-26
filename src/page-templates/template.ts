import { parseDocument } from 'htmlparser2'
import { Node } from 'domhandler'
import Expander from './expander.js'

function main (): void {
  const doc = readHtml(process.argv[2])
  const expander = new Expander(doc)
  expander.walk()
  console.log(expander.getResult())
}

function readHtml (file: string): Node {
  return parseDocument(file)
}

main()
