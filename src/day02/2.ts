import { readFileSync } from 'fs';


type opponentChoice = "A" | "B" | "C"
type playerChoice = "X"|"Y"|"Z"
type gameResult = "WIN" | "LOSE" | "DRAW"

const choiceScore = {
	"A":1,
	"B": 2,
	"C": 3,
	"X": 1,
	"Y": 2,
	"Z": 3}

const gameScore = {
	"WIN": 6,
	"DRAW": 3,
	"LOSE" : 0
}

const score = (opponent: opponentChoice, player: playerChoice): number => {
	let result : gameResult
	switch(opponent) {
		case "A" : {  // Rock
			switch(player) {
				case "X": {  // Rock
					result = "DRAW"
					break;
			}
				case "Y": {  // Paper
					result = "WIN"
					break;
			}
				case "Z": {  // Scissorts
					result = "LOSE"
					break;
			}
	}
	break;
		}
		case "B" : {  // Paper
			switch(player) {
				case "X": {  // Rock
					result = "LOSE"
					break;
			}
				case "Y": {  // Paper
					result = "DRAW"
					break;
			}
				case "Z": {  // Scissorts
					result = "WIN"
					break;
			}
	}
	break
}
		case "C" : {  // Scissorts
			switch(player) {
				case "X": {  // Rock
					result = "WIN"
					break;
			}
				case "Y": {  // Paper
					result = "LOSE"
					break;
			}
				case "Z": {  // Scissorts
					result = "DRAW"
					break;
			}
	}
	break
}
	}
	return gameScore[result] + choiceScore[player]
}


export function part1(data: string[]): number {
	let totalScore = 0
	let opponent: opponentChoice
	let player: playerChoice
	for ( const line of data) {
		const parts = line.split(" ")
		opponent = <opponentChoice>parts[0]
		player = <playerChoice>parts[1]
		totalScore += score(opponent,player)
	}
	return totalScore
}

export function part2(data: string[]): number {
	return 0
}


if ( require.main === module ) {
const rawData = readFileSync('input.txt', { encoding: 'utf8' });
const data = rawData.split("\n").filter( (line) => line)
console.log(`Part 1 solution = ${part1(data)}`);
}
