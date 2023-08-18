async function sleep (time: number): Promise<null> {
  return await new Promise((resolve) => {
    setTimeout(() => resolve(null), time)
  })
}

await sleep(1000)
export {}
