import { Day } from "../day";

type Stack = string[];

const NUMBER_OF_STACKS = 9;

const CHARS_PER_CRATE = 3;
const CHARS_BETWEEN_CRATES = 1;
const SUM_CHAR_CRATES = CHARS_PER_CRATE + CHARS_BETWEEN_CRATES;
const LINES_BETWEEN_CRATES_AND_COMMANDS = 2;

const STACK_FROM_INDEX = 3;
const STACK_TO_INDEX = 5;
const STACK_TIMES_INDEX = 1;
const STACK_QUANTITIES_INDEX = 1;

class Day5 extends Day {
    stacks: Stack[] = [];

    constructor(){
        super(5);
    }

    solveForPartOne(input: string): string {
        const lines = input.split('\n');
        const endOfStackLinesIndex = this.initializeStacks(lines);
        

        for (let linesIndex = endOfStackLinesIndex + LINES_BETWEEN_CRATES_AND_COMMANDS; linesIndex < lines.length; linesIndex++) {
            const command: string[] = lines[linesIndex].split(' ');
            if (command[0] === 'move') {
                const fromStack = Number(command[STACK_FROM_INDEX]);
                const toStack = Number(command[STACK_TO_INDEX]);
                const times = Number(command[STACK_TIMES_INDEX]);
                this.moveOneCratePerTime(fromStack, toStack, times);
            }
        }

        return this.getTopCratesInStacks();
    }

    solveForPartTwo(input: string): string {
        const lines = input.split('\n');
        const endOfStackLinesIndex = this.initializeStacks(lines);
        

        for (let linesIndex = endOfStackLinesIndex + LINES_BETWEEN_CRATES_AND_COMMANDS; linesIndex < lines.length; linesIndex++) {
            const command: string[] = lines[linesIndex].split(' ');
            if (command[0] === 'move') {
                const fromStack = Number(command[STACK_FROM_INDEX]);
                const toStack = Number(command[STACK_TO_INDEX]);
                const quantity = Number(command[STACK_QUANTITIES_INDEX]);
                this.moveCratesAtTheSameTime(fromStack, toStack, quantity);
            }
        }

        return this.getTopCratesInStacks();
    }

    initializeStacks(input: string[]): number {
        this.stacks = Array.from(Array(NUMBER_OF_STACKS), () => []);

        let index = 0;
        let endIndex = 0;
        let isEndOfStackLines: boolean = false;

        for (index = 0; index < input.length && !isEndOfStackLines; index++) {
            const cratesLine: string = input[index];

            for(let cratesLineIndex = 0; cratesLineIndex < cratesLine.length; cratesLineIndex += SUM_CHAR_CRATES) {
                if (cratesLine.charAt(cratesLineIndex + 1) !== ' ') { 
                    const currentStack = this.stacks[cratesLineIndex / SUM_CHAR_CRATES];
                    currentStack.push(cratesLine.charAt(cratesLineIndex + 1));
                }
            }

            if (input[index + 1].charAt(1) === '1') isEndOfStackLines = true;

            endIndex++;
        }

        return endIndex;
    }

    moveOneCratePerTime(fromStack: number, toStack: number, times: number): void {
        for(let i = 0; i < times; i++) {
            const crate = this.stacks[fromStack - 1].shift();
            if (crate) this.stacks[toStack - 1].unshift(crate);
        }
    }

    moveCratesAtTheSameTime(fromStack: number, toStack: number, quantity: number): void {
        const crates: string[] = [];

        for(let i = 0; i < quantity; i++) {
            const crate = this.stacks[fromStack - 1].shift();
            if (crate) crates.push(crate);
        }
        for(let i = 0; i < quantity; i++) {
            const crate = crates.pop();
            if (crate) this.stacks[toStack - 1].unshift(crate);
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