import fs from 'node:fs'
import { exit } from 'node:process'

const files = process.argv.slice(2)
let processedFile = 0
let total = 0

for (const file of files) {
  fs.readFile(file, (err, data) => {
    if (err != null) {
      console.error(err)
      exit(-1)
    }
    let lines = 1
    for (const char of data.toString()) {
      if (char === '\n') {
        lines++
      }
    }
    console.log(`${file} ${lines}`)
    processedFile++
    total += lines
    if (processedFile === files.length) {
      console.log(`total ${total}`)
    }
  })
}
