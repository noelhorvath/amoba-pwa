import { Injectable } from '@angular/core';
import { BoardCellValue } from '../../shared/enums/BoardCellValue.enum';
import { GameMode, GameStatus } from '../../shared/enums/GameEngine.enums';
import { IPlayer } from '../../shared/models/interfaces/IPlayer';
import { Cell } from '../../shared/models/classes/Cell';
import { Board } from '../../shared/models/classes/Board';
import { RandomPlayer } from '../../shared/models/classes/RandomPlayer';
import { PlayerColor, PlayerType } from '../../shared/enums/Player.enums';
import { RealPlayer } from '../../shared/models/classes/RealPlayer';
import { Coordinate } from 'src/app/shared/models/classes/Coordinate';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameState } from '../../shared/types/GameEngineTypes';
import { RecordCoordinate } from '../../shared/models/classes/RecordCoordinate';
import { IGameSettings } from '../../shared/models/interfaces/IGameSettings';

@Injectable({
    providedIn: 'root'
})
export class GameEngineService {
    public static readonly WHITE_WINNER_STATE: string = new Array(Board.MIN_SIZE).fill(BoardCellValue.WHITE).join('');
    public static readonly BLACK_WINNER_STATE: string = new Array(Board.MIN_SIZE).fill(BoardCellValue.BLACK).join('');
    private aiMatchSubscription: Subscription | undefined;
    private state: GameState;
    private board: Board;
    private playerTurn: PlayerColor;
    private turnIndex: number;
    private aiSpeed: number | undefined;
    public mode: GameMode | undefined;
    public players: IPlayer<BoardCellValue>[];
    public prevMove: Cell | undefined;
    public boardState$: BehaviorSubject<Board>;
    public state$: BehaviorSubject<GameState>;
    public playerTurn$: BehaviorSubject<PlayerColor>;
    public turnIndex$: BehaviorSubject<number>;

    public static playerColorToBoardCellValue(color: PlayerColor): BoardCellValue {
        switch (color) {
            case PlayerColor.WHITE:
                return BoardCellValue.WHITE;
            case PlayerColor.BLACK:
                return BoardCellValue.BLACK;
            default:
                throw new Error('Invalid player color!');
        }
    }

    public static playerColorFromNumber(num: number): PlayerColor {
        if (num !== 1 && num !== 0) {
            throw new Error(`Cannot convert ${num} to player color!`);
        }
        return num === 0 ? PlayerColor.WHITE : PlayerColor.BLACK;
    }

    public static playerColorToNumber(color: PlayerColor): number {
        switch (color) {
            case PlayerColor.BLACK:
                return 1;
            case PlayerColor.WHITE:
                return 0;
            default:
                throw new Error('Invalid player color!');
        }
    }

    public static gameModeToString(gameMode: GameMode): string {
        switch (gameMode) {
            case GameMode.AI_VS_AI:
                return 'AI vs AI';
            case GameMode.REAL_VS_AI:
                return 'Real vs AI';
            case GameMode.REAL_VS_REAL:
                return 'Real vs Real';
            default:
                throw new Error('Invalid game mode!');
        }
    }

    public static getConcedeResultFromPlayerColor(concededPlayerColor: PlayerColor): GameStatus {
        switch (concededPlayerColor) {
            case PlayerColor.WHITE:
                return GameStatus.BLACK_WON;
            case PlayerColor.BLACK:
                return GameStatus.WHITE_WON;
            default:
                throw new Error('Invalid player color!');
        }
    }

    public constructor() {
        this.state = { status: GameStatus.NOT_STARTED };
        this.state$ = new BehaviorSubject<GameState>(this.state);
        this.board = new Board();
        this.boardState$ = new BehaviorSubject<Board>(this.board);
        this.playerTurn = PlayerColor.WHITE;
        this.playerTurn$ = new BehaviorSubject<PlayerColor>(this.playerTurn);
        this.players = [];
        this.turnIndex = 0;
        this.turnIndex$ = new BehaviorSubject<number>(this.turnIndex);
    }

    private checkBoardCols(): GameState {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        }

        for (let i = 0; i < this.board.boardSize; i++) {
            const cords: RecordCoordinate[] = [];
            let colState = '';

            for (let j = 0; j < this.board.boardSize; j++) {
                colState += this.board.cells[j][i];
                cords.push(new RecordCoordinate(i, j));
            }

            const whiteState = colState.indexOf(GameEngineService.WHITE_WINNER_STATE);
            const blackState = colState.indexOf(GameEngineService.BLACK_WINNER_STATE);
            if (whiteState !== -1) {
                return { status: GameStatus.WHITE_WON, winnerCords: cords.slice(whiteState, whiteState + 5) };
            } else if (blackState !== -1) {
                return { status: GameStatus.BLACK_WON, winnerCords: cords.slice(blackState, blackState + 5) };
            }
        }
        return { status: GameStatus.NOT_FINISHED };
    }

    private checkBoardDiagonals(): GameState {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        }

        const diagonalCells = [new Coordinate(), new Coordinate(0, Board.MIN_SIZE - 1)];
        const diagonals: { value: string; cords: RecordCoordinate[] }[] = [
            { value: '', cords: []},
            { value: '', cords: []},
        ];
        // dividing board into 5x5 squares when checking diagonals
        for (let i = 0; i < this.board.boardSize - Board.MIN_SIZE + 1; i++) {
            // go down
            if (i !== 0) {
                diagonalCells[0].y++;
                diagonalCells[1].y++;
            }
            for (let j = 0; j < this.board.boardSize - Board.MIN_SIZE + 1; j++) {
                for (const diag of diagonals) {
                    diag.value = '';
                    diag.cords = [];
                }
                // go right
                if (j === 0) {
                    diagonalCells[0].x = 0;
                    diagonalCells[1].x = 0;
                } else {
                    diagonalCells[0].x++;
                    diagonalCells[1].x++;
                }

                const topLeftToBottomRightDiagonalCell = diagonalCells[0].copy();
                const bottomLeftToTopRightDiagonalCell = diagonalCells[1].copy();
                for (let k = 0; k < Board.MIN_SIZE; k++) {
                    diagonals[0].cords.push(topLeftToBottomRightDiagonalCell.copy());
                    diagonals[1].cords.push(bottomLeftToTopRightDiagonalCell.copy());
                    diagonals[0].value += this.board.cells[topLeftToBottomRightDiagonalCell.y++][topLeftToBottomRightDiagonalCell.x++];
                    diagonals[1].value += this.board.cells[bottomLeftToTopRightDiagonalCell.y--][bottomLeftToTopRightDiagonalCell.x++];
                }

                for (const diag of diagonals) {
                    if (diag.value.includes(GameEngineService.WHITE_WINNER_STATE)) {
                        return { status: GameStatus.WHITE_WON, winnerCords: diag.cords };
                    } else if (diag.value.includes(GameEngineService.BLACK_WINNER_STATE)) {
                        return { status: GameStatus.BLACK_WON, winnerCords: diag.cords };
                    }
                }
            }
        }
        return { status: GameStatus.NOT_FINISHED };
    }

    private checkBoardRows(): GameState {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        }

        for (let i = 0; i < this.board.cells.length; i++)
        {
            const rowState = this.board.cells[i].join('');
            const whiteState = rowState.indexOf(GameEngineService.WHITE_WINNER_STATE);
            const blackState = rowState.indexOf(GameEngineService.BLACK_WINNER_STATE);
            if (whiteState !== -1) {
                const cords: RecordCoordinate[] = [];
                for (let j = whiteState; j < whiteState + 5; j++) {
                    cords.push(new RecordCoordinate(j, i));
                }
                return { status: GameStatus.WHITE_WON, winnerCords: cords };
            } else if (blackState !== -1) {
                const cords: RecordCoordinate[] = [];
                for (let j = blackState; j < blackState + 5; j++) {
                    cords.push(new RecordCoordinate(j, i));
                }
                return { status: GameStatus.BLACK_WON, winnerCords: cords };
            }
        }
        return { status: GameStatus.NOT_FINISHED };
    }

    public checkPossibleDraw(): boolean {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        }

        for (let i = 0; i < this.board.boardSize; i++) {
            let col = '';

            if (!(this.board.cells[i].includes(BoardCellValue.WHITE) && this.board.cells[i].includes(BoardCellValue.BLACK))) {
                return false;
            }

            for (let j = 0; j < this.board.boardSize; j++) {
                col += this.board.cells[j][i];
            }

            if (!(col.includes(BoardCellValue.WHITE) && col.includes(BoardCellValue.BLACK))) {
                return false;
            }
        }

        const diagonalCells = [new Coordinate(), new Coordinate(0, Board.MIN_SIZE - 1)];
        const diagonals = new Array<string>(2);
        for (let i = 0; i < this.board.boardSize - Board.MIN_SIZE + 1; i++) {
            if (i !== 0) {
                diagonalCells[0].y++;
                diagonalCells[1].y++;
            }
            for (let j = 0; j < this.board.boardSize - Board.MIN_SIZE + 1; j++) {
                diagonals[0] = '';
                diagonals[1] = '';
                if (j === 0) {
                    diagonalCells[0].x = 0;
                    diagonalCells[1].x = 0;
                } else {
                    diagonalCells[0].x++;
                    diagonalCells[1].x++;
                }

                for (let k = 0; k < Board.MIN_SIZE; k++) {
                    diagonals[0] += this.board.cells[diagonalCells[0].y + k][diagonalCells[0].x + k];
                    diagonals[1] += this.board.cells[diagonalCells[1].y - k][diagonalCells[1].x + k];
                }

                for (const diag of diagonals) {
                    if (!(diag.includes(BoardCellValue.WHITE) && diag.includes(BoardCellValue.BLACK))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private setBoard(board: Board): void {
        this.board = board;
        this.boardState$.next(board);
    }

    private setTurnIndex(turnIndex: number): void {
        this.turnIndex = turnIndex;
        this.turnIndex$.next(this.turnIndex);
    }

    private setPlayerTurn(color: PlayerColor): void {
        this.playerTurn = color;
        this.playerTurn$.next(this.playerTurn);
    }

    private setState(state: GameState): void {
        this.state = { status: state.status };
        this.state.winnerCords = state.winnerCords?.slice(0);
        this.state$.next(this.state);
    }

    private performAIMove(): void {
        if (!this.isGameRunning()) {
            throw new Error('No game is running!');
        } else if (this.mode === GameMode.REAL_VS_REAL) {
            throw new Error('Current game has no AI player(s)!');
        }

        const res = this.players.filter(player => player.type === PlayerType.AI && player.color === this.playerTurn);
        if (res.length === 1 && res[0] !== undefined && res[0] instanceof RandomPlayer) {
            this.setMove(res[0].getMove(this.board, this.prevMove));
        }
    }

    private getNextMove(timeout: number = 1500): void {
        if (!this.isGameRunning()) {
            throw new Error('No game is running!');
        }

        try {
            switch (this.mode) {
                case GameMode.REAL_VS_REAL:
                    break;
                case GameMode.REAL_VS_AI:
                    this.aiMatchSubscription = this.state$.subscribe( (state: GameState) => {
                        if (state.status === GameStatus.NOT_FINISHED) {
                            if (this.isAITurn()) {
                                if (timeout > 0) {
                                    setTimeout( () => {
                                        this.performAIMove();
                                    }, timeout);
                                } else {
                                    this.performAIMove();
                                }
                            }
                        } else {
                            this.aiMatchSubscription?.unsubscribe();
                        }
                    });
                    break;
                case GameMode.AI_VS_AI:
                    this.aiMatchSubscription = this.state$.subscribe( (state: GameState) => {
                        if (state.status === GameStatus.NOT_FINISHED) {
                            if (timeout > 0) {
                                setTimeout( () => {
                                    this.performAIMove();
                                }, timeout);
                            } else {
                                this.performAIMove();
                            }
                        } else {
                            this.aiMatchSubscription?.unsubscribe();
                        }
                    });
                    break;
            }
        } catch (e: unknown) {
            throw e;
        }
    }

    public isGameRunning(): boolean {
        return this.state.status === GameStatus.NOT_FINISHED;
    }

    public assignColorToPlayers(mode: GameMode): void {
        if (this.isGameRunning()) {
            throw new Error('Cannot assign colors to player, because a game is running!');
        }

        const randomNum = Math.floor(Math.random() * 2);
        this.players = new Array<IPlayer<BoardCellValue>>(2);
        switch (mode) {
            case GameMode.AI_VS_AI:
                this.players[randomNum] = new RandomPlayer(GameEngineService.playerColorFromNumber(randomNum), this.board);
                this.players[1 - randomNum] = new RandomPlayer(GameEngineService.playerColorFromNumber(1 - randomNum), this.board);
                break;
            case GameMode.REAL_VS_AI:
                this.players[randomNum] = new RealPlayer(GameEngineService.playerColorFromNumber(randomNum));
                this.players[1 - randomNum] = new RandomPlayer(GameEngineService.playerColorFromNumber(1 - randomNum), this.board);
                break;
            case GameMode.REAL_VS_REAL:
                this.players[randomNum] = new RealPlayer(GameEngineService.playerColorFromNumber(randomNum));
                this.players[1 - randomNum] = new RealPlayer(GameEngineService.playerColorFromNumber(1 - randomNum));
                break;
            default:
                throw new Error('Invalid game mode!');
        }
    }

    public setPreviewBoard(boardSize: number): void {
        if (this.isGameRunning()) {
            throw new Error('Board cannot be changed, because game is running!');
        }
        this.boardState$.next(new Board(boardSize));
    }

    public checkStatus(): GameState {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        }

        if (this.checkPossibleDraw()) {
            this.setState({ status: GameStatus.DRAW });
            return this.state;
        }

        const results: GameState[] = [];
        results.push(this.checkBoardRows());
        results.push(this.checkBoardCols());
        results.push(this.checkBoardDiagonals());
        for (const result of results) {
            if (result.status !== GameStatus.NOT_FINISHED) {
                this.setState(result);
                return result;
            }
        }
        this.setState({ status: this.board.isFilled() ? GameStatus.DRAW : GameStatus.NOT_FINISHED });
        return this.state;
    }

    public startGame(gameSettings: IGameSettings): void {
        if (this.isGameRunning()) {
            throw new Error('A game is already running!');
        }

        try {
            this.prevMove = undefined;
            this.mode = gameSettings.gameMode;
            this.aiSpeed = gameSettings.aiGameSpeed;
            this.setTurnIndex(this.mode !== GameMode.REAL_VS_REAL ? 0 : 1);
            this.setBoard(new Board(gameSettings.boardSize));
            this.assignColorToPlayers(this.mode);
            this.setPlayerTurn(PlayerColor.WHITE);
            this.setState({ status: GameStatus.NOT_FINISHED });
            if (this.mode !== GameMode.REAL_VS_REAL) {
                this.getNextMove(this.aiSpeed);
            }
        } catch (e: unknown) {
            throw e;
        }
    }

    public setMove(move: Cell): void {
        if (!this.isGameRunning()) {
            throw new Error('Game is not running!');
        } else if (!this.isValidMove(move)) {
            throw new Error('Invalid move!');
        }

        try {
            if (this.state.status === GameStatus.NOT_FINISHED) {
                this.setTurnIndex(++this.turnIndex);
                this.board.setCell(move);
                this.prevMove = move;
                this.boardState$.next(this.board);
                this.setPlayerTurn(GameEngineService.playerColorFromNumber(1 - GameEngineService.playerColorToNumber(this.playerTurn)));
                this.checkStatus();
            }
        } catch (e: unknown) {
            throw e;
        }
    }

    public isValidMove(move: Cell): boolean {
        if (!this.isGameRunning()) {
            throw new Error('No game is running!');
        }

        return 0 <= move.y && move.y < this.board.boardSize
            && 0 <= move.x && move.x < this.board.boardSize
            && this.board.cells[move.y][move.x] === BoardCellValue.EMPTY;
    }

    public concede(): void {
        if (!this.isGameRunning()) {
            throw new Error('No game is running!');
        } else if (this.mode === GameMode.AI_VS_AI) {
            throw new Error('Concede is not available for AI VS AI mode!');
        }

        this.setState({ status: GameEngineService.getConcedeResultFromPlayerColor(this.playerTurn) });
    }

    public isAITurn(): boolean {
        return this.isGameRunning() && (this.mode === GameMode.AI_VS_AI || (this.mode === GameMode.REAL_VS_AI
                && this.players?.[GameEngineService.playerColorToNumber(this.playerTurn)].type === PlayerType.AI));
    }

    public wasGameStarted(): boolean {
        return this.state.status !== GameStatus.NOT_STARTED;
    }
}
