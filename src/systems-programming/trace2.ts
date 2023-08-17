const blue = <A, B>(left: (arg0: A) => B, right: A): void => {
  console.log('BLUE')
  left(right)
}

blue(
  (callback) => {
    console.log('GREEN')
    callback()
  },
  () => console.log('RED')
)

// BLUE
// GREEN
// RED

export { }
