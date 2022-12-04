import { Day } from "../day";

class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        const zonePairs: string[] = input.split('\n');
        let sumFullOverlappingRanges = 0;

        zonePairs.forEach(zones => {
            const [zoneOne, zoneTwo] = zones.split(',');
            const arrZoneOne = this.getZoneArray(zoneOne);
            const arrZoneTwo = this.getZoneArray(zoneTwo);

            const overlapsFullZoneOne = arrZoneOne.every(id => arrZoneTwo.includes(id));
            const overlapsFullZoneTwo = arrZoneTwo.every(id => arrZoneOne.includes(id));

            if (overlapsFullZoneOne || overlapsFullZoneTwo) sumFullOverlappingRanges++;
        });

        return sumFullOverlappingRanges.toString();
    }

    solveForPartTwo(input: string): string {
        const zonePairs: string[] = input.split('\n');
        let sumOverlappingRanges = 0;

        zonePairs.forEach(zones => {
            const [zoneOne, zoneTwo] = zones.split(',');
            const arrZoneOne = this.getZoneArray(zoneOne);
            const arrZoneTwo = this.getZoneArray(zoneTwo);

            const overlapsZoneOne = arrZoneOne.some(id => arrZoneTwo.includes(id));
            const overlapsZoneTwo = arrZoneTwo.some(id => arrZoneOne.includes(id));

            if (overlapsZoneOne || overlapsZoneTwo) sumOverlappingRanges++;
        });

        return sumOverlappingRanges.toString();
    }

    getZoneArray(ids: string): number[] {
        const [start, end] = ids.split('-').map(id => Number(id));
        return Array(end - start + 1).fill(0).map((value, index) => value = start + index);
    }
}

export default new Day4;