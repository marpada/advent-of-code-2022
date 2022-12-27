import { readFileSync } from 'fs';

type Choice = 'A' | 'B' | 'C';
type secondColumnChoice = 'X' | 'Y' | 'Z';
type GameResult = 'WIN' | 'LOSE' | 'DRAW';

export class Game {
  static options: string = 'ABC';

  static score(opponent: Choice, player: Choice): number {
    let resultScore: number;
    if (opponent === player) {
      resultScore = 3; // Draw
    } else if (
      (Game.options.indexOf(opponent) + 1) % Game.options.length ==
      Game.options.indexOf(player)
    ) {
      resultScore = 6; // Win
    } else {
      resultScore = 0; // Lose
    }
    return resultScore + Game.options.indexOf(player) + 1;
  }

  static playerChoice(opponent: Choice, result: GameResult): Choice {
    let playerPos: number;
    if (result === 'DRAW') {
      return opponent;
    } else if (result == 'WIN') {
      playerPos = (Game.options.indexOf(opponent) + 1) % Game.options.length;
    } else {
      // LOSE
      playerPos = (Game.options.indexOf(opponent) + 2) % Game.options.length;
    }
    return <Choice>Game.options.at(playerPos);
  }
}

export function part1(data: string[]): number {
  let totalScore = 0;
  let opponent: Choice;
  let player: Choice;
  for (const line of data) {
    const parts = line.split(' ');
    opponent = <Choice>parts[0];
    switch (parts[1]) {
      case 'X': {
        // Rock
        player = 'A';
        break;
      }
      case 'Y': {
        // Paper
        player = 'B';
        break;
      }
      case 'Z': {
        // Scissors
        player = 'C';
        break;
      }
      default: {
        player = 'A';
        break;
      }
    }
    totalScore += Game.score(opponent, player);
  }
  return totalScore;
}

export function part2(data: string[]): number {
  let totalScore = 0;
  // let opponent: Choice;
  const results: Record<secondColumnChoice, GameResult> = {
    'X': 'LOSE',
    'Y': 'DRAW',
    'Z': 'WIN',
  };
  for (const line of data) {
    const parts = line.split(' ');
    const opponent = <Choice>parts[0];
    const result = <secondColumnChoice>parts[1];
    const player = Game.playerChoice(opponent, results[result]);
    totalScore += Game.score(opponent, player);
  }
  return totalScore;
}

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData.split('\n').filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
  console.log(`Part 2 solution = ${part2(data)}`);
}
