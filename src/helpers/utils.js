export function range(start, end) {
  return [...new Array(end).keys()].map((x) => x + start)
}
