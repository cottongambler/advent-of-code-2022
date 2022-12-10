import { Day } from "../day";

type Position = {
    x: number;
    y: number;
}

type PossiblePosition = {
    position: Position;
    visited: boolean;
};

type PossiblePositions = PossiblePosition[];

const MAX_KNOTS_PART_1 = 2;
const MAX_KNOTS_PART_2 = 10;

class Day9 extends Day {
    possiblePositions: PossiblePositions;
    knotsRope: Position[];

    constructor(){
        super(9);
        this.possiblePositions = [{
            position: {x: 0, y: 0},
            visited: true
        }];
        this.knotsRope = []
    }

    solveForPartOne(input: string): string {
        this.possiblePositions = [{
            position: {x: 0, y: 0},
            visited: true
        }];
        this.knotsRope = [];
        for (let i = 0; i < MAX_KNOTS_PART_1; i++) this.knotsRope.push({x: 0, y: 0});

        const lines: string[] = input.split('\n');
        lines.forEach(line => {
            const [newPosition, times] = line.split(' ');
            this.moveKnotsRopePosition(newPosition, Number(times));
        });

        return this.getSumVisitedPositions().toString();
    }

    solveForPartTwo(input: string): string {
        this.possiblePositions = [{
            position: {x: 0, y: 0},
            visited: true
        }];
        this.knotsRope = [];
        for (let i = 0; i < MAX_KNOTS_PART_2; i++) this.knotsRope.push({x: 0, y: 0});

        const lines: string[] = input.split('\n');
        lines.forEach(line => {
            const [newPosition, times] = line.split(' ');
            this.moveKnotsRopePosition(newPosition, Number(times));
        });

        return this.getSumVisitedPositions().toString();
    }

    moveKnotsRopePosition(position: string, times: number) {
        switch (position) {
            case 'R': this.knotsMoveRight(times); break;
            case 'L': this.knotsMoveLeft(times); break;
            case 'U': this.knotsMoveUp(times); break;
            case 'D': this.knotsMoveBottom(times); break;
            default: break;
        }
    }

    knotsMoveRight(times: number) {
        for (let i = 0; i < times; i++) {
            this.knotsRope[0] = {x: this.knotsRope[0].x + 1, y: this.knotsRope[0].y};
            for(let knot = 1; knot < this.knotsRope.length; knot++) {
                if(!this.knotIsAdjacent(knot - 1, knot)) this.knotAdjustPosition(knot - 1, knot);
            }

        }
    }

    knotsMoveLeft(times: number) {
        for (let i = 0; i < times; i++) {
            this.knotsRope[0] = {x: this.knotsRope[0].x - 1, y: this.knotsRope[0].y};
            for(let knot = 1; knot < this.knotsRope.length; knot++) {
                if(!this.knotIsAdjacent(knot - 1, knot)) this.knotAdjustPosition(knot - 1, knot);
            }

        }
    }

    knotsMoveUp(times: number) {
        for (let i = 0; i < times; i++) {
            this.knotsRope[0] = {x: this.knotsRope[0].x, y: this.knotsRope[0].y + 1};
            for(let knot = 1; knot < this.knotsRope.length; knot++) {
                if(!this.knotIsAdjacent(knot - 1, knot)) this.knotAdjustPosition(knot - 1, knot);
            }

        }
    }

    knotsMoveBottom(times: number) {
        for (let i = 0; i < times; i++) {
            this.knotsRope[0] = {x: this.knotsRope[0].x, y: this.knotsRope[0].y - 1};
            for(let knot = 1; knot < this.knotsRope.length; knot++) {
                if(!this.knotIsAdjacent(knot - 1, knot)) this.knotAdjustPosition(knot - 1, knot);
            }

        }
    }

    knotIsAdjacent(previousKnot: number, currentKnot: number): boolean {
        const distX = Math.abs(this.knotsRope[previousKnot].x - this.knotsRope[currentKnot].x);
        const distY = Math.abs(this.knotsRope[previousKnot].y - this.knotsRope[currentKnot].y);
        
        if(distX === 0 && distY === 0) return true;
        else if (distX === 1 && distY === 0) return true;
        else if (distX === 0 && distY === 1) return true;
        else if (distX === 1 && distY === 1) return true;
        
        return false;
    }

    knotAdjustPosition(previousKnot: number, currentKnot: number) {
        if (this.knotsRope[previousKnot].x > this.knotsRope[currentKnot].x) {
            this.knotsRope[currentKnot].x = this.knotsRope[currentKnot].x + 1;
        }
        else if (this.knotsRope[previousKnot].x < this.knotsRope[currentKnot].x) {
            this.knotsRope[currentKnot].x = this.knotsRope[currentKnot].x - 1;
        }
        
        if (this.knotsRope[previousKnot].y > this.knotsRope[currentKnot].y) {
            this.knotsRope[currentKnot].y = this.knotsRope[currentKnot].y + 1;
        }
        else if (this.knotsRope[previousKnot].y < this.knotsRope[currentKnot].y) {
            this.knotsRope[currentKnot].y = this.knotsRope[currentKnot].y - 1;
        }

        this.checkPositionVisitedByLastKnot();
    }

    checkPositionVisitedByLastKnot() {
        const knotsLength = this.knotsRope.length;
        const possiblePosition = this.possiblePositions
            .find(possiblePosition => 
                possiblePosition.position.x === this.knotsRope[knotsLength - 1].x && 
                possiblePosition.position.y === this.knotsRope[knotsLength - 1].y);

        if(possiblePosition) return;

        this.possiblePositions.push({
            position: {x: this.knotsRope[knotsLength - 1].x, y: this.knotsRope[knotsLength - 1].y},
            visited: true
        });
    }

    getSumVisitedPositions(): number {
        const visitedPositions = this.possiblePositions
            .map(position => position.visited)
            .reduce((accumulator, currentValue) => accumulator + (currentValue ? 1 : 0), 0);

        return visitedPositions;
    }
}

export default new Day9;