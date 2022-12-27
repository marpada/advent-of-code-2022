import { part1, part2 } from './5';

const data = [
  '    [D]    ',
  '[N] [C]    ',
  '[Z] [M] [P]',
  ' 1   2   3',
  '',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2	',
];

describe('day 5', () => {
  test('part 1', () => {
    expect(part1(data)).toBe('CMZ');
  });
});
