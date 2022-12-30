import { part1} from './6'

const buffers = [
'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
'bvwbjplbgvbhsrlpgdmjqwftvncz',
'nppdvjthqldpwncqszvftbrmjlhg',
'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
]

const markerPositions = [ 7,5,6,10,11]


describe('day 6', () => {
  const testTable: [string,number][] = buffers.map( (buffer, index) => [buffer, markerPositions[index]])
  test.each(testTable)('marker position %#', ( buffer, expected) => {
    expect(part1(buffer)).toBe(expected)
  })
});
