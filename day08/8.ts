import { readFileSync } from 'fs'

export type Tree = number

type Direction = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'

export class Patch {
  constructor(private trees: Tree[][] = []) { }

  get maxRow() {
    return this.trees.length - 1
  }

  get maxColumn() {
    return this.trees[this.maxRow].length - 1
  }

  row(r: number): Tree[] {
    if (r < this.trees.length) {
      return this.trees[r]
    } else { return [] }
  }

  column(c: number): Tree[] {
    if (c > this.maxColumn) {
      return []
    }
    let result: Tree[] = []
    for (let row of this.trees) {
      result.push(row[c])
    }
    return result
  }

  treesInLine(row: number, column: number, direction: Direction): Tree[] {
    switch (direction) {
      case 'LEFT':
        return this.trees[row].slice(0, column).reverse()
        break;
      case 'RIGHT':
        return this.trees[row].slice(column + 1)
        break;
      case 'TOP':
        return this.column(column).slice(0, row).reverse()
        break;
      case 'BOTTOM':
        return this.column(column).slice(row + 1)
        break;
      default:
        return []
        break;
    }
  }

  isTreeVisible(row: number, column: number): boolean {
    if (row == 0 || column == 0 || row == this.maxRow || column == this.maxColumn) {
      return true
    }
    const tree = this.trees[row][column]
    const col = this.column(column)
    if
      (
      tree > Math.max(...this.trees[row].slice(0, column))  // can be seen from the left
      || tree > Math.max(...this.trees[row].slice(column + 1)) // can be seen from the right
      || tree > Math.max(...col.slice(0, row)) // can be seen from the top
      || tree > Math.max(...col.slice(row + 1)) // can be seen from the bottom
    ) {
      return true
    }
    else {
      return false
    }
  }

  scoreInDirection(row: number, column: number, direction: Direction): number {
    let score: number = 0
    if (row == 0 || column == 0 || row == this.maxRow || column == this.maxColumn) {
      return 0
    }
    const tree = this.trees[row][column]
    for (let t of this.treesInLine(row, column, direction)) {
      score++
      if (t >= tree) {
        break
      }
    }
    return score

  }

  scenicScore(row: number, column: number): number {
    const directions: Direction[] = ['LEFT', 'RIGHT', 'BOTTOM', 'TOP']
    const score = directions.reduce<number>((accumulator: number, current: Direction) => {
      return accumulator * this.scoreInDirection(row, column, current)
    }, 1)
    return score
  }
}

export const part1 = (data: string[]): number => {
  let sum = 0
  const trees: number[][] = data.map((row) => {
    return row.split("").map((i) => +i)
  })
  const patch = new Patch(trees)
  for (let row = 0; row <= patch.maxRow; row++) {
    for (let col = 0; col <= patch.maxColumn; col++) {
      if (patch.isTreeVisible(row, col)) {
        sum++
      }
    }
  }
  return sum
}


export const part2 = (data: string[]): number => {
  let maxScore = 0
  const trees: number[][] = data.map((row) => {
    return row.split("").map((i) => +i)
  })
  const patch = new Patch(trees)
  for (let row = 0; row <= patch.maxRow; row++) {
    for (let col = 0; col <= patch.maxColumn; col++) {
      let score = patch.scenicScore(row, col)
      if (score > maxScore) {
        maxScore = score
      }
    }
  }
  return maxScore
}

if (require.main === module) {
  const data = readFileSync('input.txt', { encoding: 'utf8' }).split("\n").filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
  console.log(`Part 2 solution = ${part2(data)}`);
}
