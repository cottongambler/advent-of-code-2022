import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const caloriesPerElf = this.caloriesPerElf(input);
        const maxCalories = Math.max(...caloriesPerElf);

        return maxCalories.toString();
    }

    solveForPartTwo(input: string): string {
        const caloriesPerElf = this.caloriesPerElf(input);
        caloriesPerElf.sort((a, b) => b - a);

        const topThreeCaloriesSum = caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2];
        return topThreeCaloriesSum.toString();
    }

    caloriesPerElf(input: string): number[] {
        const caloriesPerElf: number[] = [];

        input
            .split("\n\n")
            .forEach(mealsPerElf => {
                const calories = mealsPerElf
                .split("\n")
                .map(meals => Number(meals))
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

                caloriesPerElf.push(calories);
            });
        
            return caloriesPerElf;
    }
}

export default new Day1;