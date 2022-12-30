import { part1, part2 } from './6'

const startOfPacketTestBuffers = [
  'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
]
const startOfPacketMarkerPositions = [7, 5, 6, 10, 11]
const startOfMessageTestBuffers =
  [
    'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    'bvwbjplbgvbhsrlpgdmjqwftvncz',
    'nppdvjthqldpwncqszvftbrmjlhg',
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
  ]
const startOfMessageMarkerPositions = [19, 23, 23, 29, 26]

describe('day 6', () => {
  const startOfPacketTestTable: [string, number][] = startOfPacketTestBuffers.map((buffer, index) => [buffer, startOfPacketMarkerPositions[index]])
  test.each(startOfPacketTestTable)('Part 1 - Start of Packet Marker position %#', (buffer, expected) => {
    expect(part1(buffer)).toBe(expected)
  })
  const startOfMessageTestTable: [string, number][] = startOfMessageTestBuffers.map((buffer, index) => [buffer, startOfMessageMarkerPositions[index]])
  test.each(startOfMessageTestTable)('Part 2 - Start of Message Marker position %#', (buffer, expected) => {
    expect(part2(buffer)).toBe(expected)
  })
});
