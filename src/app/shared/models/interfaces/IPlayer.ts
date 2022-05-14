import { PlayerColor, PlayerType } from '../../enums/Player.enums';
import { IBoard } from './IBoard';
import { ICell } from './ICell';

export interface IPlayer<CellType> {
    color: PlayerColor;
    type: PlayerType;
    getMove?(board: IBoard<CellType>, prevMove?: ICell<CellType>): ICell<CellType>;
}
