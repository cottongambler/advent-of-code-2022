import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        const characters: string[] = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        const priorities: number[] = [];

        input.split('\n').forEach(ruckSack => {
            const firstCompartment = ruckSack.split('').slice(0, ruckSack.length / 2);
            const secondCompartment = ruckSack.split('').slice(ruckSack.length / 2);

            const sharedItemIndex = firstCompartment.findIndex(item => secondCompartment.includes(item));
            const sharedItem = firstCompartment[sharedItemIndex];

            const sharedItemPriority = characters.findIndex(char => char === sharedItem);

            priorities.push(sharedItemPriority);
        });

        return this.sumPriorities(priorities).toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }

    sumPriorities(priorities: number[]): number {
        return priorities.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

export default new Day3;