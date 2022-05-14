import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { ICell } from './ICell';

export interface IBoard<CellType> {
    readonly boardSize: number;
    cells: CellType[][];
    setCell(cell: ICell<CellType>): void;
    setCell(x: number, y: number, value: BoardCellValue): void;
    resetCells(): void;
    isFilled(): boolean;
    copyCells(): CellType[][];
}
