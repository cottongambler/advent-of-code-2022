import { Day } from "../day";

class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        const zonePairs: string[] = input.split('\n');
        let sumFullRanges = 0;

        zonePairs.forEach(zones => {
            const [zoneOne, zoneTwo] = zones.split(',');
            const [zoneOneStart, zoneOneEnd] = zoneOne.split('-').map(id => Number(id));
            const [zoneTwoStart, zoneTwoEnd] = zoneTwo.split('-').map(id => Number(id));

            const arrZoneOne = Array(zoneOneEnd - zoneOneStart + 1).fill(0)
                .map((value, index) => value = zoneOneStart + index);
            const arrZoneTwo = Array(zoneTwoEnd - zoneTwoStart + 1).fill(0)
                .map((value, index) => value = zoneTwoStart + index);

            const containsZoneOneFullRange = arrZoneOne.every(id => arrZoneTwo.includes(id));
            const containsZoneTwoFullRange = arrZoneTwo.every(id => arrZoneOne.includes(id));
            console.log(zones, '\n', arrZoneOne, '\n', arrZoneTwo, '\n', containsZoneOneFullRange, containsZoneTwoFullRange, '\n');

            if (containsZoneOneFullRange || containsZoneTwoFullRange) sumFullRanges++;
        });

        return sumFullRanges.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day4;