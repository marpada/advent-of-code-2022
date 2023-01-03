import { part1 } from "./8";

const data = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
]

describe('Day 8', () => {
  test('Part1', () => {
    expect(part1(data)).toBe(21)
  })
})
