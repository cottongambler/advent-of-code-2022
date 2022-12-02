import { Day } from "../day";

const enum RockPaperScissor {
    Rock = "rock",
    Paper = "paper",
    Scissor = "scissor"
};

const enum GameState {
    Win = "win",
    Draw = "draw",
    Lose = "lose",
    Invalid = "invalid"
};

const playerInputMapper = {
    X: RockPaperScissor.Rock,
    Y: RockPaperScissor.Paper,
    Z: RockPaperScissor.Scissor
};

const opponentInputMapper = {
    A: RockPaperScissor.Rock,
    B: RockPaperScissor.Paper,
    C: RockPaperScissor.Scissor
};

const gameScoreMapper = {
    [GameState.Win]: 6,
    [GameState.Draw]: 3,
    [GameState.Lose]: 0,
    [GameState.Invalid]: 0
};

const playerScoreMapper = {
    [RockPaperScissor.Rock]: 1,
    [RockPaperScissor.Paper]: 2,
    [RockPaperScissor.Scissor]: 3
};

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        const scores: number[] = [];

        input
        .split("\n")
        .forEach(round => {
            const [opponentInput, playerInput] = round.split(" ");
            const player = playerInputMapper[playerInput as keyof typeof playerInputMapper];
            const opponent = opponentInputMapper[opponentInput as keyof typeof opponentInputMapper];
            const roundScore = this.roundScore(player, opponent);
            scores.push(roundScore);
        });

        return this.getTotalScore(scores).toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }

    roundScore(player: RockPaperScissor, opponent: RockPaperScissor): number {
        const roundResult = this.playRound(player, opponent);
        return gameScoreMapper[roundResult] + playerScoreMapper[player];
    }

    playRound(player: RockPaperScissor, opponent: RockPaperScissor): GameState {
        if (player === RockPaperScissor.Rock && opponent === RockPaperScissor.Rock) return GameState.Draw;
        if (player === RockPaperScissor.Paper && opponent === RockPaperScissor.Paper) return GameState.Draw;
        if (player === RockPaperScissor.Scissor && opponent === RockPaperScissor.Scissor) return GameState.Draw;

        if (player === RockPaperScissor.Rock && opponent === RockPaperScissor.Scissor) return GameState.Win;
        if (player === RockPaperScissor.Paper && opponent === RockPaperScissor.Rock) return GameState.Win;
        if (player === RockPaperScissor.Scissor && opponent === RockPaperScissor.Paper) return GameState.Win;

        if (player === RockPaperScissor.Rock && opponent === RockPaperScissor.Paper) return GameState.Lose;
        if (player === RockPaperScissor.Paper && opponent === RockPaperScissor.Scissor) return GameState.Lose;
        if (player === RockPaperScissor.Scissor && opponent === RockPaperScissor.Paper) return GameState.Lose;

        return GameState.Invalid;
    }

    getTotalScore(scores: number[]): number {
        return scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

export default new Day2;