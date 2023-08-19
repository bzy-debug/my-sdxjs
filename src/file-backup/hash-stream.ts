import crypto from 'node:crypto'
import fs from 'node:fs'

const file = process.argv[2]

const hash = crypto.createHash('sha1').setEncoding('hex')
fs.createReadStream(file).pipe(hash)

hash.on('finish', () => {
  const final = hash.read()
  console.log('final', final)
})

console.log('program ends')
