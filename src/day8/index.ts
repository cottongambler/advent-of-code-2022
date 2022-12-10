import { Day } from "../day";

type Tree = {
    height: number;
    visibility: boolean;
    scenicScore: number;
}

type Forest = Tree[][];

class Day8 extends Day {

    constructor(){
        super(8);
    }

    solveForPartOne(input: string): string {
        const forest = this.initForest(input);
        this.calculateForestVisibility(forest);
        return this.getTotalVisibleTrees(forest).toString();
    }

    solveForPartTwo(input: string): string {
        const forest = this.initForest(input);
        this.calculateForestScenicScore(forest);
        return this.getMaxScenicScore(forest).toString();
    }

    initForest(input: string): Forest {
        const lines = input.split('\n');
        const forest: Forest = Array.from(Array(lines.length), () => []);
        lines.forEach((line, index) => {
            const treeLine = line.trim().split('');
            treeLine.forEach(tree => forest[index].push({height: Number(tree), visibility: true, scenicScore: 0}));
        });

        return forest;
    }

    calculateForestVisibility(forest: Forest) {
        for(let x = 1; x < forest[0].length - 1; x++) {
            for(let y = 1; y < forest.length - 1; y++) {
                this.calculateTreeVisibility(forest, x, y);
            }            
        }
    }

    calculateTreeVisibility(forest: Forest, x: number, y: number) {
        const tree = forest[x][y];

        const leftTrees = this.getLeftTrees(forest, x, y).map(tree => tree.height);
        const rightTrees = this.getRightTrees(forest, x, y).map(tree => tree.height);
        const topTrees = this.getTopTrees(forest, x, y).map(tree => tree.height);
        const bottomTrees = this.getBottomTrees(forest, x, y).map(tree => tree.height);

        const leftMaxHeight = Math.max(...leftTrees);
        const rightMaxHeight = Math.max(...rightTrees);
        const topMaxHeight = Math.max(...topTrees);
        const bottomMaxHeight = Math.max(...bottomTrees);

        if( leftMaxHeight >= tree.height &&
            rightMaxHeight >= tree.height &&
            topMaxHeight >= tree.height &&
            bottomMaxHeight >= tree.height
            ) {
                tree.visibility = false;
            }
    }

    getTotalVisibleTrees(forest: Forest): number {
        let visibleTrees = 0;

        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                if(forest[x][y].visibility) visibleTrees++;
            }
        }

        return visibleTrees;
    }

    getLeftTrees(forest: Forest, x: number, y: number) : Tree[] {
        const trees: Tree[] = [];
        for(let i = 0; i < x; i++) {
            trees.push(forest[i][y]);
        }
        return trees;
    }

    getRightTrees(forest: Forest, x: number, y: number) : Tree[] {
        const trees: Tree[] = [];
        for(let i = x + 1; i < forest[x].length; i++) {
            trees.push(forest[i][y]);
        }
        return trees;
    }

    getTopTrees(forest: Forest, x: number, y: number) : Tree[] {
        const trees: Tree[] = [];
        for(let i = 0; i < y; i++) {
            trees.push(forest[x][i]);
        }
        return trees;
    }

    getBottomTrees(forest: Forest, x: number, y: number) : Tree[] {
        const trees: Tree[] = [];
        for(let i = y + 1; i < forest.length ; i++) {
            trees.push(forest[x][i]);
        }
        return trees;
    }

    calculateForestScenicScore(forest: Forest) {
        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                this.calculateTreeScenicScore(forest, x, y);
            }            
        }
    }

    calculateTreeScenicScore(forest: Forest, x: number, y: number) {
        const leftDistance = this.getLeftDistance(forest, x, y);
        const rightDistance = this.getRightDistance(forest, x, y);
        const topDistance = this.getTopDistance(forest, x, y);
        const bottomDistance = this.getBottomDistance(forest, x, y);

        forest[x][y].scenicScore = leftDistance * rightDistance * topDistance * bottomDistance;
    }

    getMaxScenicScore(forest: Forest): number {
        let scenicScores: number[] = [];

        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                scenicScores.push(forest[x][y].scenicScore);
            }
        }

        return Math.max(...scenicScores);
    }

    getLeftDistance(forest: Forest, column: number, row: number): number {
        if (row === 0) return 0;

        const currentTree = forest[column][row];
        const trees: Tree[] = [];

        for(let i = row - 1; i >= 0; i--) {
            const tree = forest[column][i];
            trees.push(tree);
            if (tree.height >= currentTree.height) break;
        }

        return trees.length;
    }

    getRightDistance(forest: Forest, column: number, row: number): number {
        if (row === forest[column].length - 1) return 0;

        const currentTree = forest[column][row];
        const trees: Tree[] = [];

        for(let i = row + 1; i < forest[column].length;  i++) {
            const tree = forest[column][i];
            trees.push(tree);
            if (tree.height >= currentTree.height) break;
        }

        return trees.length;
    }

    getTopDistance(forest: Forest, column: number, row: number): number {
        if (column === 0) return 0;

        const currentTree = forest[column][row];
        const trees: Tree[] = [];

        for(let i =column - 1; i >= 0; i--) {
            const tree = forest[i][row];
            trees.push(tree);
            if (tree.height >= currentTree.height) break;
        }

        return trees.length;
    }

    getBottomDistance(forest: Forest, column: number, row: number): number {
        if (column === forest.length - 1) return 0;

        const currentTree = forest[column][row];
        const trees: Tree[] = [];

        for(let i = column + 1; i < forest.length; i++) {
            const tree = forest[i][row];
            trees.push(tree);
            if (tree.height >= currentTree.height) break;
        }

        return trees.length;
    }

    printForest(forest: Forest) {
        let line = 'HEIGHT\n';

        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                line += (forest[x][y].height).toString() + ' ';
            }
            console.log(line, '\n');
            line = '';
        }

        console.log('\nVISIBILITY');
        

        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                line += (forest[x][y].visibility ? 1 : 0).toString() + ' ';
            }
            console.log(line, '\n');
            line = '';
        }

        console.log('\nSCENIC SCORE');

        for(let x = 0; x < forest[0].length; x++) {
            for(let y = 0; y < forest.length; y++) {
                line += (forest[x][y].scenicScore).toString() + ' ';
            }
            console.log(line, '\n');
            line = '';
        }
        
    }
}

export default new Day8;