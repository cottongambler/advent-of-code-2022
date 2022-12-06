import { Day } from "../day";

const PACKET_MARKER_SIZE = 4;

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        const dataStream: string[] = input.split('');
        let packetMarker: string[] = [];
        let firstMarkerIndex = 0;

        for (let i = 0; i < dataStream.length && packetMarker.length < PACKET_MARKER_SIZE; i++) {
            if (packetMarker.includes(dataStream[i])) packetMarker = [];
            packetMarker.push(dataStream[i]);

            firstMarkerIndex = i + 1;
        }

        return firstMarkerIndex.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day6;