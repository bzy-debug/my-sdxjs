import { glob } from 'glob'
import { Stats } from 'node:fs'
import fs from 'node:fs/promises'

const srcDir = process.argv[2]

async function countLines (fileName: string): Promise<number | undefined> {
  try {
    const content = await fs.readFile(fileName, { encoding: 'utf-8' })
    return content.split('\n').length
  } catch (err) {
    console.error(err)
  }
}

async function statPair (fileName: string): Promise<[string, Stats]> {
  const stat = await fs.stat(fileName)
  return [fileName, stat]
}

const names = await glob(`${srcDir}/**/*.*`)
const statPairs = await Promise.all(names.map(statPair))
const files = statPairs.filter(([_, stat]) => stat.isFile())
for (const [file] of files) {
  const lines = await countLines(file)
  if (lines === undefined) continue
  console.log(`${file} ${lines}`)
}
