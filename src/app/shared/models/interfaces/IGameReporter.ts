import { IGameReport } from './IGameReport';

export interface IGameReporter<CellType> {
    saveGame(gameReport: IGameReport<CellType>): Promise<void>;
    loadGame(id: number): Promise<IGameReport<CellType>>;
}
