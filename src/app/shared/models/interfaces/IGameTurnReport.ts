import { GameStatus } from '../../enums/GameEngine.enums';
import { ICell } from './ICell';

export interface IGameTurnReport<CellType> {
    readonly turnIndex: number;
    readonly boardStatus: CellType[][];
    readonly gameStatus: GameStatus;
    readonly move: ICell<CellType>;
}
