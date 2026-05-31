import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '../src/assets/bottle.png')
const DST = path.resolve(__dirname, '../src/assets/bottle-cutout.png')

const img = sharp(SRC).ensureAlpha()
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

const corner = (x, y) => {
  const i = (y * width + x) * channels
  return [data[i], data[i + 1], data[i + 2]]
}

const samples = [
  corner(2, 2),
  corner(width - 3, 2),
  corner(2, height - 3),
  corner(width - 3, height - 3),
]
const bgR = Math.round(samples.reduce((a, c) => a + c[0], 0) / samples.length)
const bgG = Math.round(samples.reduce((a, c) => a + c[1], 0) / samples.length)
const bgB = Math.round(samples.reduce((a, c) => a + c[2], 0) / samples.length)

console.log(`Detected background: rgb(${bgR}, ${bgG}, ${bgB})`)

const HARD = 18
const SOFT = 42
const out = Buffer.from(data)

for (let p = 0; p < width * height; p++) {
  const i = p * channels
  const r = out[i], g = out[i + 1], b = out[i + 2]
  const dr = r - bgR, dg = g - bgG, db = b - bgB
  const dist = Math.sqrt(dr * dr + dg * dg + db * db)
  if (dist <= HARD) {
    out[i + 3] = 0
  } else if (dist < SOFT) {
    const t = (dist - HARD) / (SOFT - HARD)
    out[i + 3] = Math.round(t * out[i + 3])
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(DST)

console.log(`Wrote ${DST}`)
