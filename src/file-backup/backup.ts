import fs from 'node:fs/promises'
import hashExisting from './hash-existing-async.js'
import findNew from './check-existing-files.js'
import path from 'node:path'

async function backup (src: string, dst: string, timestamp: number | null = null): Promise<void> {
  if (timestamp === null) {
    timestamp = Math.round((new Date()).getTime() / 1000)
  }
  const timestampString: string = String(timestamp).padStart(10, '0')

  const existing = await hashExisting(src)
  if (existing == null) return
  const needToCopy = await findNew(dst, existing)
  await copyFiles(dst, needToCopy)
  await saveManifest(dst, timestampString, existing)
}

async function copyFiles (dst: string, needToCopy: Map<string, string>): Promise<void> {
  const promises = []
  for (const [hash, srcPath] of needToCopy) {
    const dstPath = path.join(dst, `${hash}.bck`)
    promises.push(fs.copyFile(srcPath, dstPath))
  }
  await Promise.all(promises)
}

async function saveManifest (dst: string, timestamp: string, pathHash: Array<[string, string]>): Promise<void> {
  pathHash = pathHash.sort(([patha, _hasha], [pathb, _hashb]) => patha.localeCompare(pathb))
  const content = pathHash.map(
    ([path, hash]) => `${path},${hash}`).join('\n')
  const manifest = `${dst}/${timestamp}.csv`
  await fs.writeFile(manifest, content, 'utf-8')
}

export default backup
