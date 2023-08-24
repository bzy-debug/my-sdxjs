import fs, { PathLike } from 'fs'

function copyStream (src: PathLike, dst: PathLike): void {
  const input = fs.createReadStream(src)
  const output = fs.createWriteStream(dst)
  input.pipe(output)
}

export default copyStream
