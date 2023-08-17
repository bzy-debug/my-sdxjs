import { exit } from 'process'
import fs from 'node:fs'
const [srcExt, dstExt, ...files] = process.argv.slice(2)

for (const file of files) {
  const dstFile = file.replace(srcExt, dstExt)
  fs.stat(dstFile, (err) => {
    if (err == null) {
      // file exists
      return
    }
    if (err.code === 'ENOENT') {
      // file not exists
      fs.rename(file, dstFile, (err) => {
        if (err != null) {
          console.error(err)
          exit(-1)
        }
      })
    }
  })
}
