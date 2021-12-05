// How many measurements are larger than the previous measurement?
// 1. import text file as string
const fs = require("fs");
// const text = fs.readFileSync("./data.txt").toString();
const text = fs.readFileSync("./data.txt").toString();
// 2. split string into array by delimiter empty space or by new line
const textArray1 = text.split("\n");
const textArray = text.split("\n");
// // 3. loop over array, check if array[i] > array[i-1]

let counter = 0;
// for (let i = 1; i < textArray.length; i++) {
// 	const currentElement = parseInt(textArray[i]);
// 	const previousElement = parseInt(textArray[i - 1]);

// 	if (currentElement > previousElement) {
// 		// console.log(`Current element ${currentElement} > previous element ${previousElement}`);
// 		counter++;
// 	}
// }

// count the number of times the sum of measurements in this
//  sliding window increases from the previous sum.
// 1. splice three elements of array multiple times
let sumArray = [];
let lowerBoundIndex = 0;
let upperBoundIndex = 3
while (upperBoundIndex -1< textArray.length) {
	const nextElements = textArray.slice(lowerBoundIndex, upperBoundIndex);
    lowerBoundIndex++;
    upperBoundIndex++;
	// 2. use reduce function for sum of the splice array
	const sum = nextElements.reduce(function (acc, currentVal) {
		return acc + parseInt(currentVal);
	}, 0);
	// push each sum into new array;
	sumArray.push(sum);
    // console.log(sum);
}
// 3. compare reduced array elemenet vs previous reduced array element
for (let i = 1; i < sumArray.length; i++) {
    if (sumArray[i] > sumArray[i-1]) {
        counter++;
    }
}
 console.log(counter);
