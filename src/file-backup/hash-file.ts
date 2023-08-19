import crypto from 'node:crypto'
import fs from 'node:fs/promises'

const file = process.argv[2]

const hash = crypto.createHash('sha1').setEncoding('hex')
const content = await fs.readFile(file)
hash.write(content)
hash.end()
const sha1sum = hash.read()

console.log(`SHA1 of "${file}" is ${sha1sum as string}`)
