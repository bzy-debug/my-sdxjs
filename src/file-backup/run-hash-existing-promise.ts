import hashExisting from './hash-existing-promise.js'

const rootDir = process.argv[2]

hashExisting(rootDir)
  .then(hashPairs => {
    hashPairs.forEach(([path, hash]) => {
      console.log(`${path} ${hash}`)
    })
  })
  .catch(err => console.error(err))
