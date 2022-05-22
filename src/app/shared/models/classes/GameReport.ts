import { IGameReport } from '../interfaces/IGameReport';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { GameMode } from '../../enums/GameEngine.enums';
import { GameTurnReport } from './GameTurnReport';
import { IGameTurnReport } from '../interfaces/IGameTurnReport';

export class GameReport implements IGameReport<BoardCellValue> {
    public id: number;
    public mode: GameMode;
    public turnReports: GameTurnReport[];

    public constructor(id: number, mode: GameMode, turnReports: IGameTurnReport<BoardCellValue>[]) {
        this.id = id;
        this.mode = mode;
        this.turnReports = turnReports.map( report => report instanceof GameTurnReport
            ? report : new GameTurnReport(report.turnIndex, report.gameStatus, report.boardStatus, report.move));
    }
}
