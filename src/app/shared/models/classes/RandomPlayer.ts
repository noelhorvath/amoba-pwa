import { IPlayer } from '../interfaces/IPlayer';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { Cell } from './Cell';
import { Board } from './Board';
import { PlayerColor, PlayerType } from '../../enums/Player.enums';
import { RecordCoordinate } from './RecordCoordinate';

export class RandomPlayer implements IPlayer<BoardCellValue> {
    private readonly freeCells: RecordCoordinate[];
    public color: PlayerColor;
    public type: PlayerType;

    public constructor(color: PlayerColor, board: Board) {
        this.color = color;
        this.type = PlayerType.AI;
        this.freeCells = [];
        for (let i = 0; i < board.boardSize; i++) { // row
            for (let j = 0; j < board.boardSize; j++) { // col
                if (board.cells[i][j] === BoardCellValue.EMPTY) {
                    this.freeCells.push(new RecordCoordinate(j, i));
                }
            }
        }
    }

    public getMove(board: Board, prevMove?: Cell): Cell {
        if (board.isFilled()) {
            throw new Error('Board is full!');
        }
        if (prevMove !== undefined) {
            this.freeCells.map( cell => cell.x !== prevMove.x && cell.y !== prevMove.y);
        }
        const selected = this.freeCells[Math.floor(Math.random() * (this.freeCells.length + 1))];
        return new Cell(selected.x, selected.y, this.color as unknown as BoardCellValue);
    }
}
