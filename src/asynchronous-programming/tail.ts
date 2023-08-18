import { exit } from 'node:process'
import fs from 'node:fs/promises'

const [countString, ...fileNames] = process.argv.slice(2)

const count = Number(countString)
if (Number.isNaN(count)) {
  console.error('first argument should be a number')
  exit(-1)
}

for (const fileName of fileNames) {
  const content = await fs.readFile(fileName, { encoding: 'utf-8' })
  content.split('\n').slice(-count).forEach(line => console.log(line))
}
