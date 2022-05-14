import { BoardCellValue } from './BoardCellValue.enum';

export enum PlayerColor {
    WHITE = BoardCellValue.WHITE,
    BLACK = BoardCellValue.BLACK
}

export enum PlayerType {
    REAL,
    AI
}
