import { Component } from '@angular/core';
import { EmoteApiService } from '../../../../services/emote-api/emote-api.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Board } from '../../../../shared/models/classes/Board';
import { GameEngineService } from '../../../../services/game-engine/game-engine.service';
import { IGameSettings } from '../../../../shared/models/interfaces/IGameSettings';
import { GameSettingsService } from '../../../../services/game-settings/game-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameMode } from '../../../../shared/enums/GameEngine.enums';
import { MessageService } from '../../../../services/message/message.service';
import { Emote } from '../../../../shared/models/classes/Emote';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    public readonly boardSizes: number[];
    public readonly gameModes: GameMode[];
    public gameSettingsFormGroup: FormGroup;
    public selectedBoardSize: number;
    public emotes: { [key: string]: Observable<Emote[] | undefined> };

    public static createRangeArray(start: number, end: number): number[] {
        if (start < 0 || end < 0) {
            throw new Error('Invalid range!');
        } else if (end < start) {
            const endNum = end;
            end = start;
            start = endNum;
        }
        return Array<number>(end - start + 1).fill(0).map( (_: number, index: number) => start + index );
    }

    public constructor(
        private emoteApi: EmoteApiService,
        private engine: GameEngineService,
        private gameSettingsService: GameSettingsService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
    ) {
        this.gameModes = [GameMode.REAL_VS_REAL, GameMode.REAL_VS_AI, GameMode.AI_VS_AI];
        this.gameSettingsFormGroup = this.formBuilder.group({
            boardSize: [undefined],
            whiteEmote: [undefined],
            blackEmote: [undefined],
            gameMode: [undefined],
            emotesSource: [undefined],
            aiGameSpeed: [undefined, [Validators.min(0), Validators.max(5000)]]
        });
        this.selectedBoardSize = 5;
        this.boardSizes = SettingsComponent.createRangeArray(Board.MIN_SIZE, Board.MAX_SIZE);
        this.emotes = {
            white: of([GameSettingsService.DEFAULT_WHITE_EMOTE]),
            black: of([GameSettingsService.DEFAULT_BLACK_EMOTE])
        };
        this.resetGameSettingsForm(false);
    }

    public gameModeToString(gameMode: GameMode): string {
        return GameEngineService.gameModeToString(gameMode);
    }

    public resetGameSettingsForm(showToast: boolean = true): void {
        this.gameSettingsService.get().then(async (settings: IGameSettings) => {
            this.gameSettingsFormGroup.patchValue({
                boardSize: settings.boardSize,
                whiteEmote: settings.whiteEmote,
                blackEmote: settings.blackEmote,
                gameMode: settings.gameMode,
                emotesSource: settings.emotesSource,
                aiGameSpeed: settings.aiGameSpeed
            });
            if (settings.emotesSource) {
                this.emotes['white'] = this.emoteApi.getEmotes(this.gameSettingsFormGroup.value.emotesSource, GameSettingsService.DEFAULT_WHITE_EMOTE);
                this.emotes['black'] = this.emoteApi.getEmotes(this.gameSettingsFormGroup.value.emotesSource, GameSettingsService.DEFAULT_BLACK_EMOTE);
            }
            if (showToast) {
                await this.messageService.createToast(
                    {
                        header: 'Settings',
                        message: 'Game settings have been reset to saved settings!',
                        color: 'success',
                        position: 'top',
                        buttons: ['X'],
                        duration: 3000,
                    }
                );
            }
        }).catch( async () => {
            if (showToast) {
                await this.messageService.createToast(
                    {
                        header: 'Settings error',
                        message: 'Failed to reset game settings!',
                        color: 'danger',
                        position: 'top',
                        buttons: ['X'],
                        duration: 3000,
                    }
                );
            }
        });
    }

    public async saveGameSettings(): Promise<void> {
        try {
            if (this.engine.isGameRunning()) {
                return this.messageService.createToast(
                    {
                        header: 'Settings error',
                        message: 'Game settings cannot be changed while a game is running!',
                        color: 'danger',
                        position: 'top',
                        buttons: ['X'],
                        duration: 3000,
                    }
                );
            }

            if (this.gameSettingsFormGroup.value.blackEmote !== undefined
                && this.gameSettingsFormGroup.value.whiteEmote !== undefined
                && this.gameSettingsFormGroup.value.whiteEmote.id === this.gameSettingsFormGroup.value.blackEmote.id
            ) {
                return this.messageService.createToast(
                    {
                        header: 'Settings error',
                        message: 'Black and white emotes must be different!',
                        color: 'danger',
                        position: 'top',
                        buttons: ['X'],
                        duration: 3000,
                    }
                );
            } else {
                if (this.gameSettingsFormGroup.value.aiGameSpeed < 0 || this.gameSettingsFormGroup.value.aiGameSpeed > 5000) {
                    return this.messageService.createToast(
                        {
                            header: 'Settings error',
                            message: 'Black and white emotes must be different!',
                            color: 'danger',
                            position: 'top',
                            buttons: ['X'],
                            duration: 3000,
                        }
                    );
                }
                await this.gameSettingsService.update({
                    blackEmote: this.gameSettingsFormGroup.value.blackEmote,
                    whiteEmote: this.gameSettingsFormGroup.value.whiteEmote,
                    boardSize: this.gameSettingsFormGroup.value.boardSize,
                    gameMode: this.gameSettingsFormGroup.value.gameMode,
                    emotesSource: this.gameSettingsFormGroup.value.emotesSource,
                    aiGameSpeed: this.gameSettingsFormGroup.value.aiGameSpeed
                });
                return this.messageService.createToast(
                    {
                        header: 'Settings',
                        message: 'Game settings have been saved!',
                        color: 'success',
                        position: 'top',
                        buttons: ['X'],
                        duration: 3000,
                    }
                );
            }
        } catch (e: unknown) {
            return this.messageService.createToast(
                {
                    header: 'Settings error',
                    message: 'Failed to save game settings!',
                    color: 'danger',
                    position: 'top',
                    buttons: ['X'],
                    duration: 3000,
                }
            );
        }
    }

    public isGameSettingsFormInvalid(): boolean {
        return this.engine.isGameRunning() || this.gameSettingsFormGroup.invalid ||
            (this.gameSettingsFormGroup.value.blackEmote !== undefined &&
                this.gameSettingsFormGroup.value.whiteEmote !== undefined &&
                this.gameSettingsFormGroup.value.blackEmote?.id === this.gameSettingsFormGroup.value.whiteEmote?.id);
    }

    public async updateEmotes(): Promise<void> {
        const emotes = await firstValueFrom(this.emoteApi.getEmotes(this.gameSettingsFormGroup.value.emotesSource));
        if (emotes !== undefined && emotes.length > 0) {
            this.emotes['white'] = this.emoteApi.getEmotes(this.gameSettingsFormGroup.value.emotesSource, GameSettingsService.DEFAULT_WHITE_EMOTE);
            this.emotes['black'] = this.emoteApi.getEmotes(this.gameSettingsFormGroup.value.emotesSource, GameSettingsService.DEFAULT_BLACK_EMOTE);
            await this.messageService.createToast(
                {
                    header: 'Settings',
                    message: 'Emotes have been updated!',
                    color: 'success',
                    position: 'top',
                    buttons: ['X'],
                    duration: 3000,
                }
            );
        } else {
            await this.messageService.createToast(
                {
                    header: 'Settings error',
                    message: 'No emotes found!',
                    color: 'danger',
                    position: 'top',
                    buttons: ['X'],
                    duration: 3000,
                }
            );
        }
    }
}
