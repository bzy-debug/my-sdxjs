import { glob } from 'glob'
import { Stats } from 'node:fs'
import fs from 'node:fs/promises'

async function countLines (fileName: string): Promise<number | null > {
  return await fs.readFile(fileName, { encoding: 'utf-8' })
    .then(content => content.split('\n').length)
    .catch(err => {
      console.error(err)
      return null
    })
}

async function statPair (fileName: string): Promise<[string, Stats]> {
  return await fs.stat(fileName).then(stat => ([fileName, stat]))
}

const srcDir = process.argv[2]

glob(`${srcDir}/**/*.*`)
  .then(async fileNames =>
    await Promise.all(fileNames.map(statPair)))
  .then(statPairs => statPairs.filter(([_, stat]) => stat.isFile()))
  .then(async statPairs => await Promise.all(statPairs.map(async ([fileName, _]) => ({ fileName, lines: await countLines(fileName) }))))
  .then(pairs => pairs.forEach(({ fileName, lines }) => {
    if (lines != null) console.log(`${fileName} ${lines}`)
  }))
  .catch(err => console.error(err))
