import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PlayerColor } from '../../../shared/enums/Player.enums';
import { GameEngineService } from '../../../services/game-engine/game-engine.service';
import { IGameSettings } from '../../../shared/models/interfaces/IGameSettings';
import { GameSettingsService } from '../../../services/game-settings/game-settings.service';
import { Cell } from '../../../shared/models/classes/Cell';
import { GameState } from '../../../shared/types/GameEngineTypes';
import { MessageService } from '../../../services/message/message.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy, OnChanges {
    private gameSettingsChangedSubscription: Subscription | undefined;
    public gameSettings: IGameSettings | undefined;
    @Input() public title: string | undefined;

    public constructor(
        private engine: GameEngineService,
        private gameSettingsService: GameSettingsService,
        private message: MessageService
    ) {
        this.title = 'toolbar';
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['title']) {
            if (this.title === 'game') {
                this.gameSettingsService.get().then( (settings: IGameSettings) => {
                    this.gameSettings = settings;
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
            }
        }
    }

    public wasGameStarted(): boolean {
        return this.engine.wasGameStarted();
    }

    public getTurnIndex(): BehaviorSubject<number> {
        return this.engine.turnIndex$;
    }

    public getPlayerTurn(): BehaviorSubject<PlayerColor> {
        return this.engine.playerTurn$;
    }

    public getPrevMove(): BehaviorSubject<Cell | undefined> {
        return this.engine.prevMove$;
    }

    public getGameState(): BehaviorSubject<GameState> {
        return this.engine.state$;
    }

    public ngOnDestroy(): void {
        this.gameSettingsChangedSubscription?.unsubscribe();
    }
}
