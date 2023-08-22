import assert from 'assert'

import findNew from '../check-existing-files.js'

describe('pre-existing hashes and actual filesystem', () => {
  it('finds no pre-existing files when none given or exist', async () => {
    const expected = new Map()
    const actual = await findNew('./src/file-backup/test/bck-0-csv-0', [])
    assert.deepStrictEqual(expected, actual,
      'Expected no files')
  })

  it('finds some files when one is given and none exist', async () => {
    const check: Array<[string, string]> = [['somefile.txt', '9876fedc']]
    const expected = new Map(Object.entries({ '9876fedc': 'somefile.txt' }))
    const actual = await findNew('./src/file-backup/test/bck-0-csv-0', check)
    assert.deepStrictEqual(expected, actual,
      'Expected one file')
  })

  it('finds nothing needs backup when there is a match', async () => {
    const check: Array<[string, string]> = [['alpha.js', 'abcd1234']]
    const expected = new Map(Object.entries({}))
    const actual = await findNew('./src/file-backup/test/bck-1-csv-1', check)
    assert.deepStrictEqual(expected, actual,
      'Expected no files')
  })

  it('finds something needs backup when there is a mismatch', async () => {
    const check: Array<[string, string]> = [['alpha.js', 'a1b2c3d4']]
    const expected = new Map(Object.entries({ a1b2c3d4: 'alpha.js' }))
    const actual = await findNew('./src/file-backup/test/bck-1-csv-1', check)
    assert.deepStrictEqual(expected, actual,
      'Expected one file')
  })

  it('finds mixed matches', async () => {
    const check: Array<[string, string]> = [
      ['matches.js', '3456cdef'],
      ['matches.txt', 'abcd1234'],
      ['mismatch.txt', '12345678']
    ]
    const expected = new Map(Object.entries({ 12345678: 'mismatch.txt' }))
    const actual = await findNew('./src/file-backup/test/bck-4-csv-2', check)
    assert.deepStrictEqual(expected, actual,
      'Expected one file')
  })
})
