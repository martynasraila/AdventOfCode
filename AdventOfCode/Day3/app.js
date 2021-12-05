// Use the binary numbers to calculate the gamma rate and epsilon rate,
//  then multiply them together.
//  (Be sure to represent your answer in decimal, not binary.)

// Load input into memory
const fs = require("fs");
const path = require("path");
const inputPath = path.resolve("./Day3/input.txt");
const lines = fs
	.readFileSync(inputPath, (encoding = "utf-8"))
	.split("\n")
	.filter((x) => Boolean(x));

const length = lines[0].length;
// store how many zeroes in each position
const zeroes = Array(length - 1).fill(0);
// store how many ones in each position
const ones = Array(length - 1).fill(0);
for (const line of lines) {
	const bits = [...line];
	bits.forEach((bit, index) => {
		// add to corresponding array with current bit index
		bit == "0" ? zeroes[index]++ : ones[index]++;
	});
}
let epsilonRate = [];
for (let i = 0; i < length - 1; i++) {
	if (ones[i] >= zeroes[i]) {
		epsilonRate.push("1");
	} else {
		epsilonRate.push("0");
	}
}

// gamma is just inverted epsilon
const gamma = epsilonRate.map((bit) => 1 - bit);
const result = parseInt(gamma.join(""), 2) * parseInt(epsilonRate.join(""), 2);

// PART 2
// result = oxygen generator rating * CO2 scrubber rating
// oxygen generator rating => most common

// co2 scrubber rating => least common

// possibly recursion
function getOxRating(lines, index = 0) {
	// // calculate most based on
	// if(index == 0) {
	// const filtered = lines.filter((line) => line[index] == epsilonRate[index]);
	// }

	const mostCommon = getMostCommonBit(lines, index);
	const filtered = lines.filter((line) => line[index] == mostCommon);

	if (filtered.length > 1) {
		return getOxRating(filtered, ++index);
	} else {
		return filtered;
	}
}
function getco2Rating(lines, index = 0) {

	const mostCommon = getLeastCommonBit(lines, index);
	const filtered = lines.filter((line) => line[index] == mostCommon);

	if (filtered.length > 1) {
		return getco2Rating(filtered, ++index);
	} else {
		return filtered;
	}
}

function getMostCommonBit(items, index) {
	let ones = 0;
	let zeroes = 0;
	items.forEach((element) => {
		if (element[index] == 0) {
			zeroes++;
		} else {
			ones++;
		}
	});
	return ones >= zeroes ? "1" : "0";
}
function getLeastCommonBit(items, index) {
	let ones = 0;
	let zeroes = 0;
	items.forEach((element) => {
		if (element[index] == 0) {
			zeroes++;
		} else {
			ones++;
		}
	});
	return ones >= zeroes ? "0" : "1";
}
// console.log(getMostCommonBit(["10", "10", "11", "11"], 1))

const parsedox = parseInt(getOxRating(lines), 2);
const parsedco2= parseInt(getco2Rating(lines), 2);
console.log(parsedox * parsedco2);