import { readFileSync } from 'fs';

export class SectionRange {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
  length(): number {
    return this.end - this.start + 1;
  }

  includes(other: SectionRange): boolean {
    if (this.length < other.length) {
      return false;
    } else if (other.start >= this.start && other.end <= this.end) {
      return true;
    } else {
      return false;
    }
  }

  overlaps(other: SectionRange): boolean {
    return this.includes(other) || other.includes(this);
  }
}

export class AssignmentsPair {
  assignment1: SectionRange;
  assignment2: SectionRange;

  constructor(s: string) {
    const parts = s.split(',');
    this.assignment1 = new SectionRange(
      +parts[0].split('-')[0],
      +parts[0].split('-')[1]
    );
    this.assignment2 = new SectionRange(
      +parts[1].split('-')[0],
      +parts[1].split('-')[1]
    );
  }

  rangesOverlap(): boolean {
    return this.assignment1.overlaps(this.assignment2);
  }
}

export const part1 = (data: string[]): number => {
  let count: number = 0;
  for (let line of data) {
    const pair = new AssignmentsPair(line);
    if (pair.rangesOverlap()) {
      count++;
    }
  }
  return count;
};

export const part2 = (data: string[]): number => {
  return 0;
};

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData.split('\n').filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
}
