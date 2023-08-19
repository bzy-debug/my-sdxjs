import Hope from './hope.js'
import fs from 'fs/promises'
import assert from 'assert'

Hope.test('delay test', async () => {
  const count = (await fs.readdir('.')).length
  assert(count === 2)
}, ['delay'])
