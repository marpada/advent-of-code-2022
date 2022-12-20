import { part1, part2, score } from './2';

const data = ['A Y', 'B X', 'C Z'];

describe('day 2', () => {
  test('part 1 example', () => {
    expect(part1(data)).toBe(15);
  });

  test('part 2 example', () => {
    expect(part2(data)).toBe(12);
  });
});

describe('scoring function', () => {
  test('Rock vs Rock', () => {
    expect(score('A', 'A')).toBe(4);
  });
  test('Rock vs Paper', () => {
    expect(score('A', 'B')).toBe(8);
  });
  test('Rock vs Scissors', () => {
    expect(score('A', 'C')).toBe(3);
  });
  test('Paper vs Rock', () => {
    expect(score('B', 'A')).toBe(1);
  });
  test('Paper vs Paper', () => {
    expect(score('B', 'B')).toBe(5);
  });
  test('Paper vs Scissors', () => {
    expect(score('B', 'C')).toBe(9);
  });
  test('Scissors vs Rock', () => {
    expect(score('C', 'A')).toBe(7);
  });
  test('Scissors vs Paper', () => {
    expect(score('C', 'B')).toBe(2);
  });
  test('Scissors vs Scissors', () => {
    expect(score('C', 'C')).toBe(6);
  });
});
