import { part1, part2, SectionRange, AssignmentsPair } from './4';

const data = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8'];

const overlapping = [false, false, false, true, true, false];

describe('assigment overlap', () => {
  const testTable: [AssignmentsPair, boolean][] = data.map((item, index) => [
    new AssignmentsPair(item),
    overlapping[index],
  ]);
  test.each(testTable)('partial overlap %#', (a, expected) => {
    expect(a.rangesOverlap()).toBe(expected);
  });
});

describe('day 4', () => {
  test('part 1', () => {
    expect(part1(data)).toBe(2);
  });
});
