import { Day } from "../day";

type Stack = string[];

const NUMBER_OF_STACKS = 9;
const CHARS_PER_CRATE = 3;
const CHARS_BETWEEN_CRATES = 1;
const SUM_CHAR_CRATES = CHARS_PER_CRATE + CHARS_BETWEEN_CRATES;
const LINES_BETWEEN_CRATES_AND_COMMANDS = 2;

class Day5 extends Day {
    stacks: Stack[] = [];

    constructor(){
        super(5);
    }

    solveForPartOne(input: string): string {
        const lines = input.split('\n');
        const endOfStackLinesInputIndex = this.initializeStacks(lines);
        

        for (let linesIndex = endOfStackLinesInputIndex + LINES_BETWEEN_CRATES_AND_COMMANDS; linesIndex < lines.length; linesIndex++) {
            const command: string[] = lines[linesIndex].split(' ');
            if (command[0] === 'move') {
                const fromStack = Number(command[3]);
                const toStack = Number(command[5]);
                const times = Number(command[1]);
                this.moveOneCratePerTime(fromStack, toStack, times);
            }
        }

        return this.getTopCratesInStacks();
    }

    solveForPartTwo(input: string): string {
        return input;
    }

    initializeStacks(input: string[]): number {
        this.stacks = Array.from(Array(NUMBER_OF_STACKS), () => []);

        let endIndex = 0;
        let index = 0;
        let isEndOfStack: boolean = false;

        for (index = 0; index < input.length && !isEndOfStack; index++) {
            const cratesLine: string = input[index];

            for(let cratesLineIndex = 0; cratesLineIndex < cratesLine.length; cratesLineIndex += SUM_CHAR_CRATES) {
                if (cratesLine.charAt(cratesLineIndex + 1) !== ' ') { 
                    const currentStack = this.stacks[cratesLineIndex / SUM_CHAR_CRATES];
                    currentStack.push(cratesLine.charAt(cratesLineIndex + 1));
                }
            }

            if (input[index + 1].charAt(1) === '1') isEndOfStack = true;

            endIndex++;
        }

        return endIndex;
    }

    moveOneCratePerTime(fromStack: number, toStack: number, times: number): void {
        console.log(fromStack, toStack, times);
        for(let i = 0; i < times; i++) {
            const crate = this.stacks[fromStack - 1].shift() ?? '';
            this.stacks[toStack - 1].unshift(crate);
        }
    }

    getTopCratesInStacks(): string {
        let crates = '';

        for(let i = 0; i < this.stacks.length; i++) {
            crates += this.stacks[i][0];
        }

        return crates;
    }
}

export default new Day5;