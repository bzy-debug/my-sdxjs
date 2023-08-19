import fs from 'node:fs/promises'
const MOCK_READ_FILE_CONTROL = [false, false, true, false, true]

async function mockReadFileSync (filename: string, encoding = 'utf-8' as const): Promise<void> {
  if (MOCK_READ_FILE_CONTROL[mockReadFileSync.count++]) {
    throw Error('error')
  } else { await fs.readFile(filename, { encoding }) }
}

mockReadFileSync.count = 0

for (let i = 0; i < MOCK_READ_FILE_CONTROL.length; i++) {
  try {
    await mockReadFileSync('README.md')
  } catch (err) {
    console.error(err)
  }
}
