import { readFileSync } from 'fs';

export class Rucksack {
  comparment1: string;
  comparment2: string;

  constructor(contents: string) {
    this.comparment1 = contents.slice(0, contents.length / 2);
    this.comparment2 = contents.slice(contents.length / 2);
  }

  duplicates(): string {
    let s = '';
    for (let i of this.comparment1) {
      if (s.includes(i)) {
        continue;
      }
      if (this.comparment2.includes(i)) {
        s += i;
      }
    }
    return s;
  }
}

export const priority = (s: string): number => {
  if (s === '') {
    return 0;
  }
  if (s.toLowerCase() === s) {
    return s.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return s.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
};

export const part1 = (rucksacks: Rucksack[]): number => {
  return rucksacks.reduce<number>(
    (accumulator, currentValue) =>
      accumulator + priority(currentValue.duplicates()),
    0
  );
};
export const part2 = (): number => {
  return 0;
};

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData
    .split('\n')
    .filter((line) => line)
    .map((s) => new Rucksack(s));
  console.log(`Part 1 solution = ${part1(data)}`);
}
