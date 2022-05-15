import { ICell } from '../interfaces/ICell';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';

export class Cell implements ICell<BoardCellValue> {
    public readonly value: BoardCellValue;
    public readonly x: number;
    public readonly y: number;

    public constructor(x = 0, y = 0, value = BoardCellValue.EMPTY)
    {
        this.x = x < 0 ? 0 : x;
        this.y = y < 0 ? 0 : y;
        this.value = value;
    }

    public copy(): Cell {
        return new Cell(this.x, this.y, this.value);
    }
}
