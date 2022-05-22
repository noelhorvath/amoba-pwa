import { IEmote } from './IEmote';
import { GameMode } from '../../enums/GameEngine.enums';

export interface IGameSettings {
    id?: string;
    whiteEmote: IEmote | undefined;
    blackEmote: IEmote | undefined;
    boardSize: number;
    gameMode: GameMode;
    emotesSource: string;
}
