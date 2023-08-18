import fs from 'node:fs/promises'

const files = process.argv.slice(2)
let commonLines: Set<string> | null = null

function intersect<T> (set1: Set<T>, set2: Set<T>): Set<T> {
  return new Set([...set1].filter(a => set2.has(a)))
}

async function getLines (file: string): Promise<Set<string>> {
  try {
    const content = await fs.readFile(file, { encoding: 'utf-8' })
    return new Set(content.split('\n'))
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

for (const file of files) {
  const lineSet = await getLines(file)
  if (commonLines == null) {
    commonLines = lineSet
  }
  commonLines = intersect(commonLines, lineSet)
}

if (commonLines == null) process.exit(0)

for (const line of commonLines) {
  console.log(line)
}
