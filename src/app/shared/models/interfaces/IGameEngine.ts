import { IBoard } from './IBoard';
import { IPlayer } from './IPlayer';
import { GameMode, GameStatus } from '../../enums/GameEngine.enums';
import { ICell } from './ICell';
import { BehaviorSubject } from 'rxjs';
import { PlayerColor } from '../../enums/Player.enums';
import { Cell } from '../classes/Cell';

export interface IGameEngine<CellType> {
    board: IBoard<CellType>;
    players: IPlayer<CellType>[];
    mode: GameMode | undefined;
    turnIndex: number;
    prevMove: ICell<CellType> | undefined;
    playerTurn: PlayerColor;
    status$: BehaviorSubject<GameStatus>;
    checkStatus(): GameStatus;
    startGame(boardSize: number, gameMode: GameMode): void;
    endGame(): void;
    assignColorToPlayers(mode: GameMode): void;
    isGameRunning(): boolean;
    isValidMove(move: Cell): boolean;
    setMove(move: Cell): void;
}
