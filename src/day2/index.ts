import { Day } from "../day";

const enum RockPaperScissor {
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
            X: RockPaperScissor.Rock,
            Y: RockPaperScissor.Paper,
            Z: RockPaperScissor.Scissor
        };

        const player = playerInputMapperPart1[playerInput as keyof typeof playerInputMapperPart1];
        const opponent = opponentInputMapper[opponentInput as keyof typeof opponentInputMapper];

        const roundResult = this.playRoundPart1(player, opponent);
        return gameScoreMapper[roundResult] + playerScoreMapper[player as keyof typeof playerScoreMapper];
    }

    playRoundPart1(player: RockPaperScissor, opponent: RockPaperScissor): GameState {
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

    getPlayerMovePart2(opponent: RockPaperScissor, roundResult: GameState): RockPaperScissor {
        if (opponent === RockPaperScissor.Rock && roundResult === GameState.Win) return RockPaperScissor.Paper;
        if (opponent === RockPaperScissor.Rock && roundResult === GameState.Draw) return RockPaperScissor.Rock;
        if (opponent === RockPaperScissor.Rock && roundResult === GameState.Lose) return RockPaperScissor.Scissor;

        if (opponent === RockPaperScissor.Paper && roundResult === GameState.Win) return RockPaperScissor.Scissor;
        if (opponent === RockPaperScissor.Paper && roundResult === GameState.Draw) return RockPaperScissor.Paper;
        if (opponent === RockPaperScissor.Paper && roundResult === GameState.Lose) return RockPaperScissor.Rock;

        if (opponent === RockPaperScissor.Scissor && roundResult === GameState.Win) return RockPaperScissor.Rock;
        if (opponent === RockPaperScissor.Scissor && roundResult === GameState.Draw) return RockPaperScissor.Scissor;
        if (opponent === RockPaperScissor.Scissor && roundResult === GameState.Lose) return RockPaperScissor.Paper;

        return RockPaperScissor.Invalid;
    }

    getTotalScore(scores: number[]): number {
        return scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

export default new Day2;