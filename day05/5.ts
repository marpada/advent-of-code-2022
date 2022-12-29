import { readFileSync } from 'fs';

export class Crate {
  private _content: string;
  constructor(content: string) {
    this._content = content;
  }

  public get content(): string {
    return this._content;
  }
}

class Movement {
  constructor(public amount: number, public from: number, public to: number) { }
}

export class Stack {
  items: Crate[] = [];

  constructor(crates: Crate[] = []) {
    this.addCrates(crates);
  }
  addCrates(crates: Crate[]): void {
    for (let crate of crates) {
      this.items.push(crate);
    }
  }
  removeCrates(n: number = 1): Crate[] {
    /** 
     * Removes top n crates from the top of the stack as a block
    **/
    let crates: Crate[] = [];
    for (let i = 0; i < n; i++) {
      if (this.items.length > 0) {
        let item = this.items.pop();
        if (item) {
          crates.push(item);
        }
      }
    }
    return crates.reverse();
  }

  topCrateContent(): string {
    if (this.items.length > 0) {
      return this.items[this.items.length - 1].content;
    }
    return '';
  }
}

type RemovalMethod = (stack: Stack, amount: number) => Crate[]

class Crane {
  stacks: Stack[] = [];
  pendingMovements: Movement[] = [];
  removalMethod: RemovalMethod
  tempCrateList: Crate[][] = [];
  constructor(data: string[], removalMethod: RemovalMethod) {
    this.removalMethod = removalMethod
    type mode = 'PARSE_CONTAINERS' | 'PARSE_MOVEMENTS' | 'PARSE_STACKS';
    let currentMode: mode = 'PARSE_CONTAINERS';
    for (let line of data) {
      if (currentMode === 'PARSE_CONTAINERS') {
        if (!line.includes('[')) {
          currentMode = 'PARSE_STACKS';
          this.parseStacks(line);
          currentMode = 'PARSE_MOVEMENTS';
        } else {
          this.parseCrates(line);
        }
      } else if (currentMode === 'PARSE_MOVEMENTS') {
        if (!line.includes('move')) {
          continue;
        }
        this.parseMovement(line);
      } else {
        throw new Error('Invalid Mode');
      }
    }
    this.applyPendingMovements();
  }

  parseCrates(line: string): void {
    let stackPos = 0;
    for (let i = 1; i < line.length; i = i + 4) {
      stackPos++;
      // Make sure we have a preinitilised tempCreateList
      if (this.tempCrateList.length < stackPos) {
        this.tempCrateList.push([]);
      }
      if (line[i] !== ' ') {
        this.tempCrateList[stackPos - 1].push(new Crate(line[i]));
      }
    }
  }

  parseStacks(line: string): void {
    for (let i = line.length - 1; i > 0; i--) {
      const parsed = parseInt(line[i]);
      if (!isNaN(parsed)) {
        let numStacks = parseInt(line[i]);
        // Make sure we have enough stacks
        while (this.stacks.length < numStacks) {
          this.stacks.push(new Stack());
        }
        for (let i = 0; i < numStacks; i++) {
          if (i < this.tempCrateList.length) {
            this.stacks[i].addCrates(this.tempCrateList[i].reverse());
          }
        }
        return;
      }
    }
  }


  static removeCratesSequentially(stack: Stack, amount: number = 1): Crate[] {
    let crates: Crate[] = []
    for (let i = 0; i < amount; i++) {
      let removedCrates = stack.removeCrates()
      if (removedCrates.length === 1) {
        crates.push(removedCrates[0])
      }
    }
    return crates
  }

  static removeBlockOfCrates(stack: Stack, amount: number = 1): Crate[] {
    return stack.removeCrates(amount)
  }

  parseMovement(line: string): void {
    const regex = /move (\d+) from (\d) to (\d)/g;
    const results = Array.from(line.matchAll(regex));
    if (results.length >= 1) {
      this.pendingMovements.push(
        new Movement(+results[0][1], +results[0][2], +results[0][3])
      );
    }
  }

  applyPendingMovements(): void {
    while (this.pendingMovements.length > 0) {
      let movement = this.pendingMovements.shift();
      if (movement) {
        let movedCrates = this.removalMethod(this.stacks[movement.from - 1], movement.amount)
        //);
        this.stacks[movement.to - 1].addCrates(movedCrates);
      }
    }
  }
}

export const part1 = (data: string[]): string => {
  let output = '';
  let crane = new Crane(data, Crane.removeCratesSequentially); //		CrateMover 9000
  for (let s of crane.stacks) {
    output += s.topCrateContent();
  }
  return output;
};

export const part2 = (data: string[]): string => {
  let output = '';
  let crane = new Crane(data, Crane.removeBlockOfCrates); //	CrateMover 9001
  for (let s of crane.stacks) {
    output += s.topCrateContent();
  }
  return output;
};

if (require.main === module) {
  const rawData = readFileSync('input.txt', { encoding: 'utf8' });
  const data = rawData.split('\n').filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
  console.log(`Part 2 solution = ${part2(data)}`);
}
