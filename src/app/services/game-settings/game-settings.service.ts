import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { IAppDatabase } from '../../shared/models/interfaces/IAppDatabase';
import { environment } from '../../../environments/environment';
import { IGameSettings } from '../../shared/models/interfaces/IGameSettings';
import { Subject } from 'rxjs';
import { GameMode } from '../../shared/enums/GameEngine.enums';
import { IndexedDBBase } from '../../shared/models/classes/IndexedDBBase';
import { Emote } from '../../shared/models/classes/Emote';

@Injectable({
    providedIn: 'root'
})
export class GameSettingsService extends IndexedDBBase<IAppDatabase, IGameSettings> {
    public static readonly DEFAULT_WHITE_EMOTE: Emote = new Emote({
        id: 'defaultWhiteAmobaEmote',
        name: 'default',
        urls: new Array<string>(4).fill('./assets/default/emotes/white.svg')
    });
    public static readonly DEFAULT_BLACK_EMOTE: Emote = new Emote({
        id: 'defaultBlackAmobaEmote',
        name: 'default',
        urls: new Array<string>(4).fill('./assets/default/emotes/black.svg')
    });
    public static readonly DEFAULT_EMPTY_EMOTE: Emote = new Emote({
        id: 'defaultEmptyAmobaEmote',
        name: 'empty',
        urls: new Array<string>(4).fill('./assets/default/emotes/empty.webp')
    });
    private readonly defaultGameSettings: IGameSettings;
    public readonly gameSettingsChanged$: Subject<void>;

    public constructor() {
        super(GameSettingsService.createDatabase());
        this.gameSettingsChanged$ = new Subject<void>();
        this.defaultGameSettings = {
            boardSize: 5,
            whiteEmote: GameSettingsService.DEFAULT_WHITE_EMOTE,
            blackEmote: GameSettingsService.DEFAULT_BLACK_EMOTE,
            gameMode: GameMode.REAL_VS_AI,
            emotesSource: undefined,
            aiGameSpeed: 1500
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
