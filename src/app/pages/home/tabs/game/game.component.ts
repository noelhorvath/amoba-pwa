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
    ) {
        this.gameSettingsChangedSubscription = this.gameSettingsService.gameSettingsChanged$.subscribe( async () => {
            try {
                this.gameSettings = await this.gameSettingsService.get();
            } catch (e: unknown) {
                console.error('Failed to get game settings!');
            }
        });
        this.gameSettingsService.get().then( (settings: IGameSettings) => {
            this.gameSettings = settings;
            this.engine.setPreviewBoard(this.gameSettings.boardSize);
        }).catch( () => console.error('Failed to get game settings!'));
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

    public startGame(): void {
        if (this.gameSettings === undefined) {
            console.error('Game settings are not available!');
            return;
        }

        try {
            this.engine.startGame(this.gameSettings);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error('GameEngine error -> ' + e.message);
                console.error('GameEngine error -> ' + e.stack);
            }
        }
    }

    public ngOnDestroy(): void {
        this.gameSettingsChangedSubscription?.unsubscribe();
    }

    public moveSetHandler(move: Cell): void {
        try {
            this.engine.setMove(move);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error('GameEngine error -> ' + e.message);
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
}
