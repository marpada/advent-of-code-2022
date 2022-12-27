import { part1, part2 } from './1';

const data = [
      1000,
      2000,
      3000,
      '',
      4000,
      '',
      5000,
      6000,
      '',
      7000,
      8000,
      9000,
      '',
      10000,
]


test('part 1 example', () => {
  expect(
    part1(data)
  ).toBe(24000);
});

test('part 2 example', () => {
  expect(
    part2(data)
  ).toBe(45000);
});
