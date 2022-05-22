import { IGameTurnReport } from '../interfaces/IGameTurnReport';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { Cell } from './Cell';
import { GameStatus } from '../../enums/GameEngine.enums';
import { ICell } from '../interfaces/ICell';

export class GameTurnReport implements IGameTurnReport<BoardCellValue> {
    public readonly turnIndex: number;
    public readonly gameStatus: GameStatus;
    public readonly boardStatus: BoardCellValue[][];
    public readonly move: Cell;

    public constructor(
        turnIndex: number,
        gameStatus: GameStatus,
        boardStatus: BoardCellValue[][],
        move: ICell<BoardCellValue>
    ) {
        this.turnIndex = turnIndex;
        this.gameStatus = gameStatus;
        this.boardStatus = boardStatus;
        this.move = move instanceof Cell ? move : new Cell(move.x, move.y, move.value);
    }
}
