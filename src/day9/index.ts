import { Day } from "../day";

type Coordinates = {
    x: number;
    y: number;
}

type Positions = boolean[][];

const POSITION_SIZE_X = 6;
const POSITION_SIZE_Y = 5;

class Day9 extends Day {
    possiblePositions: Positions;
    headRope: Coordinates;
    tailRope: Coordinates;

    constructor(){
        super(9);
        this.possiblePositions = this.initPositions();
        this.headRope = {x: 0, y: 0};
        this.tailRope = {x: 0, y: 0};
    }

    solveForPartOne(input: string): string {
        this.possiblePositions = this.initPositions();
        this.headRope = {x: 0, y: 0};
        this.tailRope = {x: 0, y: 0};

        const lines: string[] = input.split('\n');
        lines.forEach(line => {
            const [newPosition, times] = line.split(' ');
            this.moveRopePosition(newPosition, Number(times));
            
            console.log('head', this.headRope);
            console.log('tail', this.tailRope);
            this.printPosition();
        });


        return this.getSumTailPositions().toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }

    initPositions(): Positions {
        const positions: Positions = Array.from(Array(POSITION_SIZE_X), () => []);
        for(let x = 0; x < POSITION_SIZE_X; x++) {
            const column: boolean[] = positions[x];
            for (let y = 0; y < POSITION_SIZE_Y; y++) {
                const defaultMapCell = false;
                column.push(defaultMapCell);
            }
        }

        positions[0][0] = true;

        return positions;
    }

    printPosition() {
        let printedMap: string = '';
        for (let y = this.possiblePositions[0].length - 1; y >= 0; y--) {
            for(let x = 0; x < this.possiblePositions.length; x++) {
                let char = '.';
                if(x === 0 && y === 0) char = 's';
                if(x === this.tailRope.x && y === this.tailRope.y) char = 'T';
                if(x === this.headRope.x && y === this.headRope.y) char = 'H';

                printedMap += char;
            }
            printedMap += '\n';
        }

        console.log(printedMap);
    }

    moveRopePosition(position: string, times: number) {
        switch (position) {
            case 'R': this.headMoveRight(times); break;
            case 'L': this.headMoveLeft(times); break;
            case 'U': this.headMoveUp(times); break;
            case 'D': this.headMoveBottom(times); break;
            default: break;
        }
    }

    headMoveRight(times: number) {
        for (let i = 0; i < times; i++) {
            this.headRope = {x: this.headRope.x + 1, y: this.headRope.y};
            if(!this.tailIsAdjacent()) this.tailAdjustPosition();
        }
    }

    headMoveLeft(times: number) {
        for (let i = 0; i < times; i++) {
            this.headRope = {x: this.headRope.x - 1, y: this.headRope.y};
            if(!this.tailIsAdjacent()) this.tailAdjustPosition();
        }
    }

    headMoveUp(times: number) {
        for (let i = 0; i < times; i++) {
            this.headRope = {x: this.headRope.x, y: this.headRope.y + 1};
            if(!this.tailIsAdjacent()) this.tailAdjustPosition();
        }
    }

    headMoveBottom(times: number) {
        for (let i = 0; i < times; i++) {
            this.headRope = {x: this.headRope.x, y: this.headRope.y - 1};
            if(!this.tailIsAdjacent()) this.tailAdjustPosition();
        }
    }

    tailIsAdjacent(): boolean {
        const distX = Math.abs(this.headRope.x - this.tailRope.x);
        const distY = Math.abs(this.headRope.y - this.tailRope.y);
        
        
        if(distX === 0 && distY === 0) return true;
        else if (distX === 1 && distY === 0) return true;
        else if (distX === 0 && distY === 1) return true;
        else if (distX === 1 && distY === 1) return true;
        
        return false;
    }

    tailAdjustPosition() {
        if (this.headRope.x > this.tailRope.x) this.tailRope.x = this.tailRope.x + 1;
        else if (this.headRope.x < this.tailRope.x) this.tailRope.x = this.tailRope.x - 1;
        
        if (this.headRope.y > this.tailRope.y) this.tailRope.y = this.tailRope.y + 1;
        else if (this.headRope.y < this.tailRope.y) this.tailRope.y = this.tailRope.y - 1;

        this.checkPositionVisitedByTail();
    }

    checkPositionVisitedByTail() {
        this.possiblePositions[this.tailRope.x][this.tailRope.y] = true;
    }

    getSumTailPositions(): number {
        let sum = 0;
        for(let x = 0; x < POSITION_SIZE_X; x++) {
            for (let y = 0; y < POSITION_SIZE_Y; y++) {
                if (this.possiblePositions[x][y]) sum++;
            }
        }

        return sum;
    }
}

export default new Day9;