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

class Day9 extends Day {
    possiblePositions: PossiblePositions;
    headRope: Position;
    tailRope: Position;

    constructor(){
        super(9);
        this.possiblePositions = [{
            position: {x: 0, y: 0},
            visited: true
        }];
        this.headRope = {x: 0, y: 0};
        this.tailRope = {x: 0, y: 0};
    }

    solveForPartOne(input: string): string {
        this.possiblePositions = [{
            position: {x: 0, y: 0},
            visited: true
        }];
        this.headRope = {x: 0, y: 0};
        this.tailRope = {x: 0, y: 0};

        const lines: string[] = input.split('\n');
        lines.forEach(line => {
            const [newPosition, times] = line.split(' ');
            this.moveRopePosition(newPosition, Number(times));
        });


        return this.getSumTailPositions().toString();
    }

    solveForPartTwo(input: string): string {
        return input;
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
        const possiblePosition = this.possiblePositions
            .find(possiblePosition => 
                possiblePosition.position.x === this.tailRope.x && 
                possiblePosition.position.y === this.tailRope.y);

        if(possiblePosition) return; 

        this.possiblePositions.push({
            position: {x: this.tailRope.x, y: this.tailRope.y},
            visited: true
        });
    }

    getSumTailPositions(): number {
        const visitedPositions = this.possiblePositions
            .map(position => position.visited)
            .reduce((accumulator, currentValue) => accumulator + (currentValue ? 1 : 0), 0);

        return visitedPositions;
    }
}

export default new Day9;