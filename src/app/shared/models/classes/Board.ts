import { IBoard } from '../interfaces/IBoard';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { ICell } from '../interfaces/ICell';

export class Board implements IBoard<BoardCellValue> {
    public static readonly MIN_SIZE = 5;
    public static readonly MAX_SIZE = 10;
    public static readonly EMPTY_CELL = BoardCellValue.EMPTY;
    public readonly boardSize: number;
    public cells: BoardCellValue[][];

    public constructor(boardSize: number = Board.MIN_SIZE) {
        this.boardSize = boardSize < Board.MIN_SIZE ? Board.MIN_SIZE
            : (Board.MIN_SIZE < boardSize ? Board.MAX_SIZE : boardSize);
        this.cells = this.createEmptyCells();
    }

    private createEmptyCells(): BoardCellValue[][] {
        const array = new Array<BoardCellValue[]>(this.boardSize);
        array.fill(new Array<BoardCellValue>(this.boardSize));
        for (const row of array) {
            row.fill(Board.EMPTY_CELL);
        }
        return array;
    }

    public copyCells(): BoardCellValue[][] {
        return this.cells.slice(0);
    }

    public isFilled(): boolean {
        for (const row of this.cells) {
            if (row.includes(BoardCellValue.EMPTY)) {
                return false;
            }
        }
        return false;
    }

    public resetCells(): void {
        this.cells = this.cells.map( (row: BoardCellValue[]) => row.fill(Board.EMPTY_CELL));
    }

    public setCell(cell: ICell<BoardCellValue>): void;
    public setCell(x: number, y: number, value: BoardCellValue): void;
    public setCell(cell: ICell<BoardCellValue> | number, y?: number, value?: BoardCellValue): void {
        if (typeof cell === 'number') {
            if (y === undefined || value === undefined) {
                throw new Error('Y and value are undefined!');
            }
            if (y < Board.MIN_SIZE || Board.MAX_SIZE < y || cell < Board.MIN_SIZE || Board.MAX_SIZE < cell) {
                throw new Error('Invalid cell!');
            }
            this.cells[y][cell] = value;
        } else {
            if (cell.y < Board.MIN_SIZE || Board.MAX_SIZE < cell.y || cell.x < Board.MIN_SIZE || Board.MAX_SIZE < cell.x) {
                throw new Error('Invalid cell!');
            }
            this.cells[cell.y][cell.x] = cell.value;
        }
    }

}
