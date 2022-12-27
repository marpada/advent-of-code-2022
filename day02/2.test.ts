import { part1, part2, Game } from './2';

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
    expect(Game.score('A', 'A')).toBe(4);
  });
  test('Rock vs Paper', () => {
    expect(Game.score('A', 'B')).toBe(8);
  });
  test('Rock vs Scissors', () => {
    expect(Game.score('A', 'C')).toBe(3);
  });
  test('Paper vs Rock', () => {
    expect(Game.score('B', 'A')).toBe(1);
  });
  test('Paper vs Paper', () => {
    expect(Game.score('B', 'B')).toBe(5);
  });
  test('Paper vs Scissors', () => {
    expect(Game.score('B', 'C')).toBe(9);
  });
  test('Scissors vs Rock', () => {
    expect(Game.score('C', 'A')).toBe(7);
  });
  test('Scissors vs Paper', () => {
    expect(Game.score('C', 'B')).toBe(2);
  });
  test('Scissors vs Scissors', () => {
    expect(Game.score('C', 'C')).toBe(6);
  });
});

describe('choice function', () => {
	test('Rock draws draw', () => {
	expect(Game.playerChoice('A','DRAW')).toBe('A');
});
	test('Rock loses paper', () => {
	expect(Game.playerChoice('B','LOSE')).toBe('A');
});
	test('Rock wins scissors', () => {
	expect(Game.playerChoice('C','WIN')).toBe('A');
});
})
