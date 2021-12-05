// Desc:
//Start by finding the sum of all unmarked numbers on that board; in this case,the sum is 188.->
//Then, multiply that sum by the number that was just called when the board won, 24, ->
// to get the final score, 188 * 24 = 4512.

// To guarantee victory against the giant squid, figure out which board will win first.
//  What will your final score be if you choose that board?

// import * as fs from "fs";
const fs = require("fs");
const process = require("process");
const { isArray } = require("util");
process.chdir("./AdventOfCode/Day4/");

// import input as two parts: 1. Chosen random numbers 1d array; 2. Generated boards 2d array(5x5)
const allInput = fs.readFileSync("./input.txt").toString().split("\n");
// first line is chosen numbers
const chosenNumbers = allInput[0].split(",");
// truncate first two lines from the input to get only the boards input
// now get the all the boards and put them in array,
// each entry of boards array will have a 5x5 matrix as an element
allInput.splice(0, 2);
const boardsInput = allInput;
const length = boardsInput[0].length;
let matrixTemp = [];
let allBoards = [];
// form an array of matrices(boards)
boardsInput.forEach((row, index) => {
	const rowArray = getRowArray(row);
	if (rowArray.length > 1) {
		matrixTemp.push(rowArray);
	}
	// if its the last line or the next line is empty, then push matrix to array
	if (!boardsInput[index + 1] || rowArray.length == 1) {
		allBoards.push(matrixTemp);
		matrixTemp = [];
	}
});

const getMatrixColumn = (matrix, columnNumber) =>
	matrix.map((x) => x[columnNumber]);

// check which board will win first by checking rows(vertical and horizontal) for full match
// if match not found then take bigger slice of the chosenNumbers
getFirstBingo();

function getFirstBingo() {
	let numberIndex = 0;
	limitedChosenNumbers = chosenNumbers.slice(0, numberIndex);
	const resultFound = false;
	let luckyBoard;
	let luckyNumbers;

	for (let i = 0; i < chosenNumbers.length; i++) {
		// go through all boards

		for (const board of allBoards) {
			// search for a match in rows or columns
			for (let j = 0; j < board.length; j++) {
				const column = getMatrixColumn(board, j);
				const row = board[j];
				if (
					checkRowForMatch(row, limitedChosenNumbers) ||
					checkRowForMatch(column, limitedChosenNumbers)
				) {
					return { board, limitedChosenNumbers };
				}
			}
			// if(resultFound) {return 1; break;}
		}
		// if no match found with current slice of chosen numbers and went through all boards, take bigger slice +1 of numbers
		numberIndex++;
		limitedChosenNumbers = chosenNumbers.slice(0, numberIndex);
	}
}

// get all numbers which didn't match from the winner board and sum them
// if number from board is not in the list then add that number to sum
// const {luckyBoard, luckyNumbers} = getFirstBingo();
const bingoResult = getFirstBingo();
const luckyBoard = bingoResult.board;
const luckyNumbers = bingoResult.limitedChosenNumbers.map((x) => parseInt(x));
let sumOfUnmatched = 0;

for (let i = 0; i < luckyBoard.length; i++) {
	sumOfUnmatched += luckyBoard[i].map((stringVar) => parseInt(stringVar))
		.filter((x) => !luckyNumbers.includes(x))
		.reduce(
			(previousValue, currentValue) => previousValue + currentValue,
			0
		);
}
// get score by => sumOfUnmatched * last chosen number
const lastChosenNumber = luckyNumbers[luckyNumbers.length-1]
console.log("Score is: " + sumOfUnmatched * lastChosenNumber);


function checkRowForMatch(rowToCheck, numbersToCheckAgainst) {
	return rowToCheck.every((val) => numbersToCheckAgainst.includes(val));
}

function getRowArray(row) {
	return row
		.split(" ")
		.filter((r) => r)
		.map((r) => r.replace(/(\r\n|\n|\r)/gm, ""));
}

// Part2