import { readFileSync } from 'fs';

type Choice = 'A' | 'B' | 'C';
type secondColumnChoice = 'X' | 'Y' | 'Z';
type gameResult = 'WIN' | 'LOSE' | 'DRAW';

const choiceScore = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const gameScore = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const score = (opponent: Choice, player: Choice): number => {
  let result: gameResult;
  switch (opponent) {
    case 'A': {
      // Rock
      switch (player) {
        case 'A': {
          // Rock
          result = 'DRAW';
          break;
        }
        case 'B': {
          // Paper
          result = 'WIN';
          break;
        }
        case 'C': {
          // Scissors
          result = 'LOSE';
          break;
        }
      }
      break;
    }
    case 'B': {
      // Paper
      switch (player) {
        case 'A': {
          // Rock
          result = 'LOSE';
          break;
        }
        case 'B': {
          // Paper
          result = 'DRAW';
          break;
        }
        case 'C': {
          // Scissors
          result = 'WIN';
          break;
        }
      }
      break;
    }
    case 'C': {
      // Scissors
      switch (player) {
        case 'A': {
          // Rock
          result = 'WIN';
          break;
        }
        case 'B': {
          // Paper
          result = 'LOSE';
          break;
        }
        case 'C': {
          // Scissors
          result = 'DRAW';
          break;
        }
      }
      break;
    }
  }
  return gameScore[result] + choiceScore[player];
};

export function part1(data: string[]): number {
  let totalScore = 0;
  let opponent: Choice;
  let player: Choice;
  for (const line of data) {
    const parts = line.split(' ');
    opponent = <Choice>parts[0];
    switch (parts[1]) {
      case 'X': { // Rock
        player = 'A';
        break;
      }
      case 'Y': { // Paper
        player = 'B';
        break;
      }
      case 'Z': { // Scissors
        player = 'C';
        break;
      }
      default: {
        player = 'A';
        break;
      }
    }
    totalScore += score(opponent, player);
  }
  return totalScore;
}

export function part2(data: string[]): number {
  return 0;
}

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData.split('\n').filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
}
