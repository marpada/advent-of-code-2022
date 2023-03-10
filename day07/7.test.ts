import { part1, part2 } from "./7";

const data = [
  '$ cd /',
  '$ ls',
  'dir a',
  '14848514 b.txt',
  '8504156 c.dat',
  'dir d',
  '$ cd a',
  '$ ls',
  'dir e',
  '29116 f',
  '2557 g',
  '62596 h.lst',
  '$ cd e',
  '$ ls',
  '584 i',
  '$ cd ..',
  '$ cd ..',
  '$ cd d',
  '$ ls',
  '4060174 j',
  '8033020 d.log',
  '5626152 d.ext',
  '7214296 k',
]

describe('Day 7', () => {
  test('Part1', () => {
    expect(part1(data)).toBe(95437)
  })
  test('Part2', () => {
    expect(part2(data)).toBe(24933642)
  })
})
