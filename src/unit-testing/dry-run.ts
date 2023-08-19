import assert from 'assert'
import microtime from 'microtime'

// State of tests.
const HopeTests: Array<[string, () => void]> = []
let HopePass = 0
let HopeFail = 0
let HopeError = 0

// Record a single test for running later.
function hopeThat (message: string, callback: () => void): void {
  HopeTests.push([message, callback])
}

// Run all of the tests that have been asked for and report summary.
function main (): void {
  const start = microtime.now()
  HopeTests.forEach(([message, test]) => {
    try {
      test()
      HopePass += 1
    } catch (e) {
      if (e instanceof assert.AssertionError) {
        HopeFail += 1
      } else {
        HopeError += 1
      }
    }
  })
  const end = microtime.now()

  console.log(`pass ${HopePass}`)
  console.log(`fail ${HopeFail}`)
  console.log(`error ${HopeError}`)
  console.log(`time ${end - start}ms`)
}

// Something to test (doesn't handle zero properly).
function sign (value: number): number {
  if (value < 0) {
    return -1
  } else {
    return 1
  }
}

// These two should pass.
hopeThat('Sign of negative is -1', () => assert(sign(-3) === -1))
hopeThat('Sign of positive is 1', () => assert(sign(19) === 1))

// This one should fail.
hopeThat('Sign of zero is 0', () => assert(sign(0) === 0))

// This one is an error.
hopeThat('Sign misspelled is error', () => assert(sgn(1) === 1)) // eslint-disable-line

main()
