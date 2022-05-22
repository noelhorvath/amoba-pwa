import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { IAppDatabase } from '../../shared/models/interfaces/IAppDatabase';
import { environment } from '../../../environments/environment';
import { IGameSettings } from '../../shared/models/interfaces/IGameSettings';
import { Subject } from 'rxjs';
import { GameMode } from '../../shared/enums/GameEngine.enums';
import { IndexedDBBase } from '../../shared/models/classes/IndexedDBBase';

@Injectable({
    providedIn: 'root'
})
export class GameSettingsService extends IndexedDBBase<IAppDatabase, IGameSettings> {
    private readonly defaultGameSettings: IGameSettings;
    public readonly gameSettingsChanged$: Subject<void>;

    public constructor() {
        super(GameSettingsService.createDatabase());
        this.gameSettingsChanged$ = new Subject<void>();
        this.defaultGameSettings = {
            boardSize: 5,
            whiteEmote: undefined,
            blackEmote: undefined,
            gameMode: GameMode.REAL_VS_AI,
            emotesSource: 'IgorCykel'
        };
    }

    private static async createDatabase(): Promise<IDBPDatabase<IAppDatabase>> {
        return openDB<IAppDatabase>(environment.databaseName, undefined, {
            upgrade: (db: IDBPDatabase<IAppDatabase>) => {
                db.createObjectStore('game-settings', { keyPath: 'id' });
            },
        });
    }

    public async add(gameSettings: IGameSettings): Promise<void> {
        try {
            gameSettings.id = 'default';
            const database = await this.db;
            await database.add('game-settings', gameSettings);
            this.gameSettingsChanged$.next();
            return Promise.resolve();
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    public async get(): Promise<IGameSettings> {
        try {
            const database = await this.db;
            const settings = await database.get('game-settings', 'default');
            if (settings === undefined) {
                await this.add(this.defaultGameSettings);
            } else {
                return settings;
            }
            return this.defaultGameSettings;
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    public async update(gameSettings: IGameSettings): Promise<void> {
        try {
            gameSettings.id = 'default';
            const database = await this.db;
            await database.put('game-settings', gameSettings);
            this.gameSettingsChanged$.next();
            return Promise.resolve();
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }
}
