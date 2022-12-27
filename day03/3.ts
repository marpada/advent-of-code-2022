import { readFileSync } from 'fs';
import { getPriority } from 'os';

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

export const findBadge = (rucksacks: Rucksack[]): string => {
  let searchedItems: string = '';
  let contents = rucksacks.map((r) => r.comparment1 + r.comparment2);
  for (let i of contents[0]) {
    if (searchedItems.includes(i)) {
      continue;
    }
    let found = false;
    for (let content of contents.slice(1)) {
      if (!content.includes(i)) {
        found = false;
        break;
      }
      found = true;
    }
    if (found) {
      return i;
    }
  }
  return '';
};

export const part1 = (rucksacks: Rucksack[]): number => {
  return rucksacks.reduce<number>(
    (accumulator, currentValue) =>
      accumulator + priority(currentValue.duplicates()),
    0
  );
};

export const part2 = (rucksacks: Rucksack[]): number => {
  let sum = 0;
  for (let i = 0; i < rucksacks.length; i = i + 3) {
    let common = findBadge(rucksacks.slice(i, i + 3));
    let p = priority(common);
    sum += priority(findBadge(rucksacks.slice(i, i + 3)));
  }
  return sum;
};

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData
    .split('\n')
    .filter((line) => line)
    .map((s) => new Rucksack(s));
  console.log(`Part 1 solution = ${part1(data)}`);
  console.log(`Part 2 solution = ${part2(data)}`);
}
