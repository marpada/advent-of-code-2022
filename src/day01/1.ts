import { readFileSync } from 'fs';

type dataPoints = (string | number)[];

const data = readFileSync('input.txt', { encoding: 'utf8' });

const lines = data.split('\n').map((i) => +i )


const loadData = (data: dataPoints): number[] => {
	let parsedData : number[] = [];
  let currentCount = 0;
	for ( const point of data ) {
    if (point) {
      currentCount += +point;
    } else {
			parsedData.push(currentCount)
			currentCount = 0
	}
}
		parsedData.push(currentCount)
		return parsedData
}


export function part1(data: dataPoints): number {
	let calories = loadData(data)
	return calories.sort( (a,b) => b - a )[0]
}

export function part2(data: dataPoints, max = 3): number {
	let calories = loadData(data)
	calories.sort( (a,b) => b - a )
		return calories.slice(0,max).reduce((previousValue,currentValue) => previousValue + currentValue)
}

console.log(`Part 1 solution = ${part1(lines)}`)
console.log(`Part 2 solution = ${part2(lines)}`)
