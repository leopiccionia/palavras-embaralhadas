export function shuffle (array) {
  return array
    .map((item) => [item, Math.random()])
    .sort((a, b) => Math.sign(a[1] - b[1]))
    .map((item) => item[0])
}
