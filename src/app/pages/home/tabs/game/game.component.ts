import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameEngineService } from '../../../../services/game-engine/game-engine.service';
import { Board } from '../../../../shared/models/classes/Board';
import { GameSettingsService } from '../../../../services/game-settings/game-settings.service';
import { IGameSettings } from '../../../../shared/models/interfaces/IGameSettings';
import { Cell } from '../../../../shared/models/classes/Cell';
import { GameMode } from '../../../../shared/enums/GameEngine.enums';
import { PlayerColor } from '../../../../shared/enums/Player.enums';
import { GameState } from '../../../../shared/types/GameEngineTypes';
import { MessageService } from '../../../../services/message/message.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnDestroy {
    private gameSettingsChangedSubscription: Subscription;
    public gameSettings: IGameSettings | undefined;

    public constructor(
        private engine: GameEngineService,
        private gameSettingsService: GameSettingsService,
        private message: MessageService
    ) {
        this.gameSettingsChangedSubscription = this.gameSettingsService.gameSettingsChanged$.subscribe( async () => {
            try {
                this.gameSettings = await this.gameSettingsService.get();
            } catch (e: unknown) {
                await this.message.createToast({
                    header: 'Game settings error',
                    message: 'Failed to load changed game settings!',
                    buttons: ['X'],
                    position: 'top',
                    color: 'danger',
                    duration: 2000
                });
            }
        });
        this.gameSettingsService.get().then( (settings: IGameSettings) => {
            this.gameSettings = settings;
            this.engine.setPreviewBoard(this.gameSettings.boardSize);
        }).catch( async () => {
            await this.message.createToast({
                header: 'Game settings error',
                message: 'Failed to load game settings!',
                buttons: ['X'],
                position: 'top',
                color: 'danger',
                duration: 2000
            });
        });
    }

    public getBoardState(): BehaviorSubject<Board> {
        return this.engine.boardState$;
    }

    public getPlayerTurn(): BehaviorSubject<PlayerColor> {
        return this.engine.playerTurn$;
    }

    public getGameState(): BehaviorSubject<GameState> {
        return this.engine.state$;
    }

    public isGameRunning(): boolean {
        return this.engine.isGameRunning();
    }

    public async startGame(): Promise<void> {
        if (this.gameSettings === undefined) {
            return await this.message.createToast({
                header: 'Start new game error',
                message: 'Game settings are not available!',
                buttons: ['X'],
                position: 'top',
                color: 'danger',
                duration: 3000
            });
        }

        try {
            this.engine.startGame(this.gameSettings);
        } catch (e: unknown) {
            if (e instanceof Error) {
                await this.message.createToast({
                    header: 'Start new game error',
                    message: e.message,
                    buttons: ['X'],
                    position: 'top',
                    color: 'danger',
                    duration: 3000
                });
            }
        }
    }

    public ngOnDestroy(): void {
        this.gameSettingsChangedSubscription?.unsubscribe();
    }

    public async moveSetHandler(event: Cell | Error): Promise<void> {
        try {
            if (event instanceof Error) {
                await this.message.createToast({
                    header: 'Game move error',
                    message: event.message,
                    buttons: ['X'],
                    position: 'top',
                    color: 'danger',
                    duration: 1000
                });
            } else {
                this.engine.setMove(event);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                await this.message.createToast({
                    header: 'Game error',
                    message: e.message,
                    buttons: ['X'],
                    position: 'top',
                    color: 'danger',
                    duration: 1000
                });
            }
        }
    }

    public concedeGame(): void {
        this.engine.concede();
    }

    public isAITurn(): boolean {
        return this.engine.isAITurn();
    }

    public isAIGame(): boolean {
        return this.engine.mode === GameMode.AI_VS_AI;
    }

    public stopAIGame(): void {
        this.engine.stopAIGame();
    }
}
