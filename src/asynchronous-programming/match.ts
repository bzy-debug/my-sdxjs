import fs from 'node:fs/promises'

const [fragement, ...files] = process.argv.slice(2)

for (const file of files) {
  try {
    const content = await fs.readFile(file, { encoding: 'utf-8' })
    content.split('\n').forEach(line => {
      if (line.includes(fragement)) {
        console.log(line)
      }
    })
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}
