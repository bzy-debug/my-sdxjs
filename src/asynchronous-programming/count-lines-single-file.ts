import fs from 'node:fs/promises'

const fileName = process.argv[2]

fs.readFile(fileName, { encoding: 'utf-8' })
  .then(content => {
    const length = content.split('\n').length
    console.log(`${fileName} ${length}`)
  })
  .catch(err => {
    console.error(err)
  })
