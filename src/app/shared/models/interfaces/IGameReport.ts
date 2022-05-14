import { GameMode } from '../../enums/GameEngine.enums';
import { IGameTurnReport } from './IGameTurnReport';

export interface IGameReport<CellType> {
    id: number;
    mode: GameMode;
    turnReports: IGameTurnReport<CellType>[];
}
