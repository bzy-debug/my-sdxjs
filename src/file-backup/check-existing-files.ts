import { glob } from 'glob'
import path from 'node:path'

async function findNew (rootDir: string, pathHashPairs: Array<[string, string]>): Promise<Map<string, string>> {
  const hashToPath: Map<string, string> = pathHashPairs.reduce((map, [path, hash]) => {
    map.set(hash, path)
    return map
  }, new Map())

  const pattern = `${rootDir}/*.bck`
  const existingFiles = await glob(pattern)
  existingFiles.forEach(filename => {
    const stripped = path.basename(filename).replace('.bck', '')
    hashToPath.delete(stripped)
  })
  return hashToPath
}

export default findNew
