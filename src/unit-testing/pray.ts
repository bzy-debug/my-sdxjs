import Hope from './hope.js'
import minimist from 'minimist'
import { glob } from 'glob'
import path from 'node:path'

interface Args extends minimist.ParsedArgs {
  d?: string
  v: boolean
  s?: string
  select?: string
  t?: string
  tag?: string
}

async function main (args: string[]): Promise<void> {
  const options = minimist(args) as Args
  let filenames = options._
  const tag = options.t ?? options.tag
  const pattern = options.s ?? options.select ?? '**/test-*.js'
  const dir = options.d ?? '.'
  if (filenames.length === 0) {
    filenames = await glob(`${dir}/${pattern}`)
  }

  for (const file of filenames) {
    await import(`${path.resolve(file)}`)
  }

  Hope.run(tag)
  const report = options.v ? Hope.verbose() : Hope.terse()
  console.log(report)
}

await main(process.argv.slice(2))
