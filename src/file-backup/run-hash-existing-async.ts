import hashExisting from './hash-existing-async.js'

const rootDir = process.argv[2]

const hashPairs = await hashExisting(rootDir)

if (hashPairs != null) {
  for (const [path, hash] of hashPairs) {
    console.log(`${path} ${hash}`)
  }
}
