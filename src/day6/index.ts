import { Day } from "../day";

const PACKET_MARKER_SIZE = 4;
const MESSAGE_MARKER_SIZE = 14;

const INDEX_NOT_FOUND = -1;

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        return this.getFirstMarkerIndex(input, PACKET_MARKER_SIZE).toString();
    }

    solveForPartTwo(input: string): string {
        return this.getFirstMarkerIndex(input, MESSAGE_MARKER_SIZE).toString();
    }

    getFirstMarkerIndex(input: string, markerSize: number): number {
        const dataStream: string[] = input.split('');
        let marker: string[] = [];
        let firstMarkerIndex = 0;

        for (let i = 0; i < dataStream.length && marker.length < markerSize; i++) {
            const findIndex = marker.findIndex(char => char === dataStream[i]);

            if (findIndex !== INDEX_NOT_FOUND) marker = marker.slice(findIndex + 1);
            marker.push(dataStream[i]);

            firstMarkerIndex = i + 1;
        }

        return firstMarkerIndex;
    }
}

export default new Day6;