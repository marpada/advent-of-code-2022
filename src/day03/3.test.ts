import { part1, part2, priority, Rucksack } from './3';

const data = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

const ruckSacks: Rucksack[] = data.map((r) => new Rucksack(r));

describe('priority', () => {
  test('a', () => {
    expect(priority('a')).toBe(1);
  });
  test('z', () => {
    expect(priority('z')).toBe(26);
  });
  test('A', () => {
    expect(priority('A')).toBe(27);
  });
  test('Z', () => {
    expect(priority('Z')).toBe(52);
  });
});

describe('duplicates', () => {
  const results = ['p', 'L', 'P', 'v', 't', 's'];
  const testTable: [Rucksack, string][] = ruckSacks.map((r, i) => [
    r,
    results[i],
  ]);
  test.each(testTable)('duplicate %#', (r, expected) => {
    expect(r.duplicates()).toBe(expected);
  });
});

describe('day3', () => {
	test('part1', () => {
		expect(part1(ruckSacks)).toBe(157)
	})
})
