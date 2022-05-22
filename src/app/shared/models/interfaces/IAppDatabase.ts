import { DBSchema } from 'idb';
import { IGameSettings } from './IGameSettings';

export interface IAppDatabase extends DBSchema {
    'game-settings': {
        value: IGameSettings;
        key: string;
    };
}
