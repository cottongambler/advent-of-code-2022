import { Day } from "../day";

class Day3 extends Day {
    characters: string[];

    constructor(){
        super(3);
        this.characters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    }

    solveForPartOne(input: string): string {
        const priorities: number[] = [];

        input.split('\n').forEach(rucksack => {
            const firstCompartment = rucksack.split('').slice(0, rucksack.length / 2);
            const secondCompartment = rucksack.split('').slice(rucksack.length / 2);

            const sharedItemIndex = firstCompartment.findIndex(item => secondCompartment.includes(item));
            const sharedItem = firstCompartment[sharedItemIndex];

            const sharedItemPriority = this.getItemPriority(sharedItem);
            priorities.push(sharedItemPriority);
        });

        return this.sumPriorities(priorities).toString();
    }

    solveForPartTwo(input: string): string {
        const priorities: number[] = [];
        const rucksacks = input.split('\n');
        const groupSize = 3;

        for (let i = 0; i < rucksacks.length; i += groupSize) {
            const [firstRucksack, secondRucksack, thirdRucksack] = rucksacks.slice(i, i + groupSize);
            
            const sharedItemIndex = firstRucksack.split('')
                .findIndex(item => 
                    secondRucksack.split('').includes(item) 
                    && thirdRucksack.split('').includes(item)
                );
            const sharedItem = firstRucksack[sharedItemIndex];

            const sharedItemPriority = this.getItemPriority(sharedItem);
            priorities.push(sharedItemPriority);
        }

        return this.sumPriorities(priorities).toString();
    }

    getItemPriority(item: string): number {
        return this.characters.findIndex(char => char === item);
    }

    sumPriorities(priorities: number[]): number {
        return priorities.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

export default new Day3;