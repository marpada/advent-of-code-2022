import { readFileSync } from "fs"

interface FSItem {
  name: string
  size: number
}

class File implements FSItem {
  constructor(public name: string, public size: number) { }
}

class Directory implements FSItem {
  public name: string
  private _contents: { [id: string]: (File | Directory) } = {}

  constructor(name: string) {
    this.name = name
  }

  add(item: (File | Directory)): void {
    this._contents[item.name] = item
  }

  public get size(): number {
    let sum: number = 0
    for (let item of Object.values(this._contents)) {
      sum += item.size
    }
    return sum
  }

  public dirSizes(prefix = ""): { [id: string]: number } {
    let dirs: { [id: string]: number } = {}
    const key = (prefix + "/" + this.name).replace(/\/+/, '/')
    dirs[key] = this.size
    for (let item of Object.values(this._contents)) {
      if (item instanceof Directory) {
        dirs = {
          ...dirs, ...item.dirSizes(key)
        }
      }
    }
    return dirs
  }
}

class Parser {
  private rootDirectory: Directory | undefined = undefined
  private currentDirectory: (Directory | undefined) = undefined
  private previousDirectores: Directory[] = []

  parse(data: string[]): Directory | undefined {
    for (let line of data) {
      if (line.startsWith('$')) {
        this.parseCommand(line)
      } else {
        this.parseOutput(line)
      }
    }
    return this.rootDirectory
  }

  parseCommand(line: string): void {
    const parts = line.split(" ")
    if (line.startsWith('$ cd')) {
      const dirName = parts[parts.length - 1]
      if (dirName === '/') {
        if (this.rootDirectory === undefined) {
          // Init file tree
          this.rootDirectory = new Directory(dirName)
        }
        this.previousDirectores = []
        this.currentDirectory = this.rootDirectory
      } else if (dirName === '..') {
        this.currentDirectory = this.previousDirectores.pop()
      } else {
        let newDirectory = new Directory(dirName)
        if (this.currentDirectory) {
          this.currentDirectory.add(newDirectory)
          this.previousDirectores.push(this.currentDirectory)
          this.currentDirectory = newDirectory
        }
      }
    }
  }

  parseOutput(line: string): void {
    const parts = line.split(" ")
    if (line.startsWith('dir')) {
      this.currentDirectory && this.currentDirectory.add(new Directory(parts[1]))
    } else if (Number.isInteger(+parts[0])) {
      this.currentDirectory && this.currentDirectory.add(new File(parts[1], +parts[0]))
    } else {
      throw "Unknown format";

    }
  }
}

export const part1 = (data: string[]): number => {
  const d = (new Parser()).parse(data)
  if (d) {
    return Object.values(d.dirSizes()).reduce((previous, current) => {
      if (current <= 100000) { return previous + current }
      else { return previous }
    }, 0)
  } else {
    return 0
  }
}

if (require.main === module) {
  const data = readFileSync('input.txt', { encoding: 'utf8' }).split("\n").filter((line) => line);
  console.log(`Part 1 solution = ${part1(data)}`);
}
