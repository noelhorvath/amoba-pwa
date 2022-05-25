import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameStatus } from '../../../../../shared/enums/GameEngine.enums';
import { GameState } from '../../../../../shared/types/GameEngineTypes';
import { GameSettingsService } from '../../../../../services/game-settings/game-settings.service';

@Component({
    selector: 'app-game-result-item',
    templateUrl: './game-result-item.component.html',
    styleUrls: ['./game-result-item.component.scss']
})
export class GameResultItemComponent implements OnChanges {
    public readonly gameStatusEnum: typeof GameStatus;
    @Input() public gameState: GameState | undefined;
    @Input() public blackImgSrc: string | undefined;
    @Input() public whiteImgSrc: string | undefined;

    public constructor() {
        this.gameStatusEnum = GameStatus;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['blackImgSrc']) {
            if (!this.blackImgSrc) {
                this.blackImgSrc = GameSettingsService.DEFAULT_BLACK_EMOTE.urls[0];
            }
        }

        if (changes['whiteImgSrc']) {
            if (!this.whiteImgSrc) {
                this.whiteImgSrc = GameSettingsService.DEFAULT_WHITE_EMOTE.urls[0];
            }
        }
    }
}
