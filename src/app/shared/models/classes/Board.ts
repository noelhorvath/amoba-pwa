import { IBoard } from '../interfaces/IBoard';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { ICell } from '../interfaces/ICell';

export class Board implements IBoard<BoardCellValue> {
    public static readonly MIN_SIZE = 5;
    public static readonly MAX_SIZE = 10;
    public readonly boardSize: number;
    public cells: BoardCellValue[][];

    public constructor(boardSize: number = Board.MIN_SIZE) {
        this.boardSize = boardSize < Board.MIN_SIZE ? Board.MIN_SIZE
            : (Board.MAX_SIZE < boardSize ? Board.MAX_SIZE : boardSize);
        this.cells = this.createEmptyCells();
    }

    private createEmptyCells(): BoardCellValue[][] {
        const array = new Array<BoardCellValue[]>(this.boardSize);
        for (let i = 0; i < array.length; i++) {
            array[i] = new Array<BoardCellValue>(this.boardSize);
            array[i].fill(BoardCellValue.EMPTY);
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
        return true;
    }

    public resetCells(): void {
        this.cells = this.cells.map( (row: BoardCellValue[]) => row.fill(BoardCellValue.EMPTY));
    }

    public setCell(cell: ICell<BoardCellValue>): void;
    public setCell(x: number, y: number, value: BoardCellValue): void;
    public setCell(cell: ICell<BoardCellValue> | number, y?: number, value?: BoardCellValue): void {
        if (typeof cell === 'number') {
            if (y === undefined || value === undefined) {
                throw new Error('Y and value are undefined!');
            }
            if (y < 0 || this.boardSize < y || cell < 0 || this.boardSize < cell) {
                throw new Error('Invalid cell!');
            }
            this.cells[y][cell] = value;
        } else {
            if (cell.y < 0 || this.boardSize< cell.y || cell.x < 0 || this.boardSize < cell.x) {
                throw new Error('Invalid cell!');
            }
            this.cells[cell.y][cell.x] = cell.value;
        }
    }

}
