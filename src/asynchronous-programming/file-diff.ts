import fs from 'node:fs/promises'

function difference<T> (a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(x => !b.has(x)))
}

function intersect<T> (set1: Set<T>, set2: Set<T>): Set<T> {
  return new Set([...set1].filter(a => set2.has(a)))
}

async function lineSetOf (file: string): Promise<Set<string>> {
  try {
    const content = await fs.readFile(file, { encoding: 'utf-8' })
    return new Set(content.split('\n'))
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

const [file1, file2] = process.argv.slice(2)
const [lines1, lines2] = [await lineSetOf(file1), await lineSetOf(file2)]

const only1 = [...difference(lines1, lines2)].map(s => ['1', s] as const)
const only2 = [...difference(lines2, lines1)].map(s => ['2', s] as const)
const both = [...intersect(lines1, lines2)].map(s => ['*', s] as const)

;[...only1, ...only2, ...both]
  .sort(([_1, s1], [_2, s2]) => s1.localeCompare(s2))
  .forEach(([label, line]) => { console.log(`${label} ${line}`) })
