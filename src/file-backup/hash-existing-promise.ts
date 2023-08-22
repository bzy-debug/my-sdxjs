import fs from 'node:fs/promises'
import { glob } from 'glob'
import crypto from 'node:crypto'
import { Stats } from 'node:fs'

async function statPath (path: string): Promise<[string, Stats]> {
  return await fs.stat(path)
    .then(stat => [path, stat])
}

async function readPath (path: string): Promise<[string, string]> {
  return await fs.readFile(path, { encoding: 'utf-8' })
    .then(content => [path, content])
}

function hashPath (path: string, content: string): [string, string] {
  const hasher = crypto.createHash('sha1').setEncoding('hex')
  hasher.write(content)
  hasher.end()
  return [path, hasher.read()]
}

export default async function hashExisting (rootDir: string): Promise<Array<[string, string]>> {
  const pattern = `${rootDir}/**/*`

  return await new Promise((resolve, reject) => {
    glob(pattern)
      .then(async (matches) => await Promise.all(matches.map(async match => await statPath(match))))
      .then(statPairs => statPairs.filter(([_, stat]) => stat.isFile()))
      .then(async statPairs => await Promise.all(statPairs.map(async ([path, _stat]) => await readPath(path))))
      .then(contentPairs => contentPairs.map(contentPair => hashPath(...contentPair)))
      .then(resolve)
      .catch(reject)
  })
}
