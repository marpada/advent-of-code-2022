import { findBadge, part1, part2, priority, Rucksack } from './3';

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

describe('common elements', () => {
  test('First group', () => {
    expect(findBadge(ruckSacks.slice(0, 3))).toBe('r');
  });
  test('Second group', () => {
    expect(findBadge(ruckSacks.slice(3))).toBe('Z');
  });
  test('Fix item missed in third rucksack', () => {
    let ruckSacks = [
      'ZNNvFWHqLNPZHHqPTHHnTGBhrrpjvmwfMmpfpjBjwpmw',
      'sbdzQgzgssgbglRtmjlwhjBlfrSrMt',
      'zgsCRzJbsdRVQCDbcgLGWWLnZNGVLLZMNZnq',
    ].map((r) => new Rucksack(r));
    expect(findBadge(ruckSacks)).toBe('M');
  });
});

describe('day3', () => {
  test('part1', () => {
    expect(part1(ruckSacks)).toBe(157);
  });
  test('part2', () => {
    expect(part2(ruckSacks)).toBe(70);
  });
});
