import { readFileSync } from "fs"
const hasDuplicates = (s: string[]): boolean => {
  let aggregated: { [item: string]: number } = {}
  for (let char of s) {
    aggregated[char] = aggregated[char] + 1 || 1
  }
  for (let key in aggregated) {
    if (aggregated[key] > 1) { return true }
  }
  return false
}

const markerPosition = (buffer: string, markerLength: number = 4): number => {
  let currentMarker: string[] = []
  // let markerFound: boolean = false
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i]
    if (currentMarker.length == markerLength) {
      currentMarker.shift()
    }
    currentMarker.push(char)
    if ((!hasDuplicates(currentMarker)) && (currentMarker.length == markerLength)) {
      return i + 1
    }
  }
  return -1
}


export const part1 = (data: string): number => {
  return markerPosition(data)
}

if (require.main === module) {
  const data = readFileSync('input.txt', { encoding: 'utf8' });
  console.log(`Part 1 solution = ${part1(data)}`);
}
