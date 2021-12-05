const iterations = 10;

console.time('Function #2');

for (let index = 0; index < iterations; index++) {
    redditMethod1();   
}

const time2 = console.timeEnd('Function #2')

console.time("Function #1")
for (let index = 0; index < iterations; index++) {
    myMethod();
    
}
myMethod();

const time1 = console.timeEnd('Function #1')

console.log("My method is " + time1/time2 + " times faster");

function redditMethod1() {
    const fs = require("fs");
    const text = fs.readFileSync("./input.txt", encoding = "utf-8");
    const commands = text.split('\n');

    const count = (data) => {

        let hPosition = 0;
        let aim = 0;
        let depth = 0;

        data.forEach((val) => {
            num = parseInt(val.slice(-1), 10);

            val.startsWith('forward') ? (hPosition += num) && (aim > 0 ? depth += num * aim : depth = depth) : (val.startsWith('up') ? aim += (-num) : aim += num);
        }

        );
        return hPosition * depth;
    };
}

function myMethod() {
    const nReadLines = require("n-readlines");
    const input = "./input.txt";

    let posHorizontal = 0;
    let depth = 0;
    let aim = 0;

    const lines = new nReadLines(input);
    let line;

    while ((line = lines.next())) {
        const [direction, position] = line.toString().split(" ");
        const parsedPosition = parseInt(position);
        if (direction.startsWith("forward")) {
            posHorizontal += parsedPosition;
            depth += aim * parsedPosition;
        } else if (direction.startsWith("up")) {
            aim -= parsedPosition;
        } else if (direction.startsWith("down")) {
            aim += parsedPosition;
        }
    }
    const result = posHorizontal * depth;
}
myMethod2();

function myMethod2() {
    const fs = require("fs");
    const inputPath = "./input.txt";
    const input = fs.readFileSync(inputPath)

    let posHorizontal = 0;
    let depth = 0;
    let aim = 0;

    const lines = new nReadLines(input);
    let line;

    while ((line = lines.next())) {
        const [direction, position] = line.toString().split(" ");
        const parsedPosition = parseInt(position);
        if (direction.startsWith("forward")) {
            posHorizontal += parsedPosition;
            depth += aim * parsedPosition;
        } else if (direction.startsWith("up")) {
            aim -= parsedPosition;
        } else if (direction.startsWith("down")) {
            aim += parsedPosition;
        }
    }
    const result = posHorizontal * depth;
}
