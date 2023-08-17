const red = (): void => {
  console.log('RED')
}

const green = (func: () => void): void => {
  console.log('GREEN')
  func()
}

const blue = <A, B>(left: (arg0: A) => B, right: A): void => {
  console.log('BLUE')
  left(right)
}

blue(green, red)

// BLUE
// GREEN
// RED

export { }
