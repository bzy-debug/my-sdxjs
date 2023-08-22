import fs from 'node:fs/promises'
import { glob } from 'glob'
import crypto from 'node:crypto'
import { Stats } from 'node:fs'

async function statPath (path: string): Promise<[string, Stats]> {
  const stat = await fs.stat(path)
  return [path, stat]
}

async function readPath (path: string): Promise<[string, string]> {
  const content = await fs.readFile(path, { encoding: 'utf-8' })
  return [path, content]
}

function hashPath (path: string, content: string): [string, string] {
  const hasher = crypto.createHash('sha1').setEncoding('hex')
  hasher.write(content)
  hasher.end()
  return [path, hasher.read()]
}

export default async function hashExisting (rootDir: string): Promise<Array<[string, string]> | undefined> {
  const pattern = `${rootDir}/**/*`
  try {
    const matches = await glob(pattern)
    const statPairs = await Promise.all(matches.map(statPath))
    const filePairs = statPairs.filter(([_, stat]) => stat.isFile())
    const contentPairs = await Promise.all(filePairs.map(async ([path, _stat]) => await readPath(path)))
    const hashPairs = contentPairs.map(contentPair => hashPath(...contentPair))
    return hashPairs
  } catch (err) {
    console.error(err)
  }
}
