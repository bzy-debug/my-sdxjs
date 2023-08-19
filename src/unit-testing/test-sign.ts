import Hope from './hope.js'
import assert from 'assert'

function sign (value: number): number {
  if (value < 0) {
    return -1
  } else {
    return 1
  }
}

Hope.test('Sign of negative is -1', () => assert(sign(-3) === -1), ['math', 'fast'])
Hope.test('Sign of positive is 1', () => assert(sign(19) === 1), ['math'])

// This one should fail.
Hope.test('Sign of zero is 0', () => assert(sign(0) === 0), ['fast'])

// This one is an error.
Hope.test('Sign misspelled is error', () => assert(sgn(1) === 1), ['error'])
