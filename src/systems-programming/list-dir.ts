import { glob } from 'glob'
import fs from 'fs-extra'
import path from 'path'
import { exit } from 'node:process'

if (process.argv.length !== 4) {
  console.error(`expect 4 arguments but got ${process.argv.length}`)
  exit(1)
}

const [srcRoot, dstRoot] = process.argv.slice(2)

glob(`${srcRoot}/**/*.*`).then((srcNames) => {
  for (const srcName of srcNames) {
    const dstName = srcName.replace(srcRoot, dstRoot)
    const dstDir = path.dirname(dstName)
    fs.ensureDir(dstDir).catch(err => console.error(err))
    fs.copy(srcName, dstName).catch(err => console.error(err))
  }
}).catch(err => {
  console.error(err)
})
