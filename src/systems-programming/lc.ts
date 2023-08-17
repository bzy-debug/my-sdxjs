import fs from 'node:fs'

const file = process.argv[2]

fs.readFile(file, (err, data) => {
  if (err != null) {
    console.error(err)
    return
  }
  let lines = 1
  for (const char of data.toString()) {
    if (char === '\n') {
      lines++
    }
  }
  console.log(lines)
})
