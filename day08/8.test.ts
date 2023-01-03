import { Patch, part1, part2 } from "./8";

const data = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
]

const trees: number[][] = data.map((row) => {
  return row.split("").map((i) => +i)
})
const patch = new Patch(trees)

describe('treesInLine function', () => {
  test('1:2 left', () => {
    expect(patch.treesInLine(1, 2, 'LEFT')).toEqual([5, 2])
  })
  test('1:2 right', () => {
    expect(patch.treesInLine(1, 2, 'RIGHT')).toEqual([1, 2])
  })
  test('1:2 top', () => {
    expect(patch.treesInLine(1, 2, 'TOP')).toEqual([3])
  })
  test('1:2 bottom', () => {
    expect(patch.treesInLine(1, 2, 'BOTTOM')).toEqual([3, 5, 3])
  })
  test('3:2 left', () => {
    expect(patch.treesInLine(3, 2, 'LEFT')).toEqual([3, 3])
  })
  test('3:2 right', () => {
    expect(patch.treesInLine(3, 2, 'RIGHT')).toEqual([4, 9])
  })
  test('3:2 top', () => {
    expect(patch.treesInLine(3, 2, 'TOP')).toEqual([3, 5, 3])
  })
  test('3:2 bottom', () => {
    expect(patch.treesInLine(3, 2, 'BOTTOM')).toEqual([3])
  })
})

describe('Score function', () => {
  test('1:2', () => {
    expect(patch.scenicScore(1, 2)).toBe(4)
  })
  test('3:2', () => {
    expect(patch.scenicScore(3, 2)).toBe(8)
  })
})

describe('Day 8', () => {
  test('Part1', () => {
    expect(part1(data)).toBe(21)
  })
  test('Part2', () => {
    expect(part2(data)).toBe(8)
  })
})
