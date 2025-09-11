type RGB = { r: number; g: number; b: number }

function packColor11bit(c: RGB): number {
  const r = Math.round((c.r / 0xff) * 0b1111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}

function packColor10bit(c: RGB): number {
  const r = Math.round((c.r / 0xff) * 0b111)
  const g = Math.round((c.g / 0xff) * 0b1111)
  const b = Math.round((c.b / 0xff) * 0b111)
  return (r << 7) | (g << 3) | b
}
