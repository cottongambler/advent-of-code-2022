import { Day } from "../day";

const enum RPS {
    Rock = "rock",
    Paper = "paper",
    Scissor = "scissor",
    Invalid = "invalid"
};

const enum GameState {
    Win = "win",
    Draw = "draw",
    Lose = "lose",
    Invalid = "invalid"
};

const opponentInputMapper = {
    A: RPS.Rock,
    B: RPS.Paper,
    C: RPS.Scissor
};

const gameScoreMapper = {
    [GameState.Win]: 6,
    [GameState.Draw]: 3,
    [GameState.Lose]: 0,
    [GameState.Invalid]: 0
};

const playerScoreMapper = {
    [RPS.Rock]: 1,
    [RPS.Paper]: 2,
    [RPS.Scissor]: 3
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

            const roundScore = this.roundScorePart1(playerInput, opponentInput);
            scores.push(roundScore);
        });

        return this.getTotalScore(scores).toString();
    }

    solveForPartTwo(input: string): string {
        const scores: number[] = [];

        input
        .split("\n")
        .forEach(round => {
            const [opponentInput, roundResultInput] = round.split(" ");

            const roundScore = this.roundScorePart2(opponentInput, roundResultInput);
            scores.push(roundScore);
        });

        return this.getTotalScore(scores).toString();
    }

    roundScorePart1(playerInput: string, opponentInput: string): number {
        const playerInputMapperPart1 = {
            X: RPS.Rock,
            Y: RPS.Paper,
            Z: RPS.Scissor
        };

        const player = playerInputMapperPart1[playerInput as keyof typeof playerInputMapperPart1];
        const opponent = opponentInputMapper[opponentInput as keyof typeof opponentInputMapper];

        const roundResult = this.playRoundPart1(player, opponent);
        return gameScoreMapper[roundResult] + playerScoreMapper[player as keyof typeof playerScoreMapper];
    }

    playRoundPart1(player: RPS, opponent: RPS): GameState {
        if (player === RPS.Rock && opponent === RPS.Rock) return GameState.Draw;
        if (player === RPS.Paper && opponent === RPS.Paper) return GameState.Draw;
        if (player === RPS.Scissor && opponent === RPS.Scissor) return GameState.Draw;

        if (player === RPS.Rock && opponent === RPS.Scissor) return GameState.Win;
        if (player === RPS.Paper && opponent === RPS.Rock) return GameState.Win;
        if (player === RPS.Scissor && opponent === RPS.Paper) return GameState.Win;

        if (player === RPS.Rock && opponent === RPS.Paper) return GameState.Lose;
        if (player === RPS.Paper && opponent === RPS.Scissor) return GameState.Lose;
        if (player === RPS.Scissor && opponent === RPS.Paper) return GameState.Lose;

        return GameState.Invalid;
    }

    roundScorePart2(opponentInput: string, roundResultInput: string): number {
        const roundResultInputMapperPart2 = {
            X: GameState.Lose,
            Y: GameState.Draw,
            Z: GameState.Win
        };

        const opponent = opponentInputMapper[opponentInput as keyof typeof opponentInputMapper];
        const roundResult = roundResultInputMapperPart2[roundResultInput as keyof typeof roundResultInputMapperPart2];
        const player = this.getPlayerMovePart2(opponent, roundResult);

        return gameScoreMapper[roundResult] + playerScoreMapper[player as keyof typeof playerScoreMapper];
    }

    getPlayerMovePart2(opponent: RPS, roundResult: GameState): RPS {
        if (opponent === RPS.Rock && roundResult === GameState.Win) return RPS.Paper;
        if (opponent === RPS.Rock && roundResult === GameState.Draw) return RPS.Rock;
        if (opponent === RPS.Rock && roundResult === GameState.Lose) return RPS.Scissor;

        if (opponent === RPS.Paper && roundResult === GameState.Win) return RPS.Scissor;
        if (opponent === RPS.Paper && roundResult === GameState.Draw) return RPS.Paper;
        if (opponent === RPS.Paper && roundResult === GameState.Lose) return RPS.Rock;

        if (opponent === RPS.Scissor && roundResult === GameState.Win) return RPS.Rock;
        if (opponent === RPS.Scissor && roundResult === GameState.Draw) return RPS.Scissor;
        if (opponent === RPS.Scissor && roundResult === GameState.Lose) return RPS.Paper;

        return RPS.Invalid;
    }

    getTotalScore(scores: number[]): number {
        return scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

export default new Day2;