import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameStatus } from '../../../../shared/enums/GameEngine.enums';
import { GameState } from '../../../../shared/types/GameEngineTypes';
import { GameSettingsService } from '../../../../services/game-settings/game-settings.service';

@Component({
    selector: 'app-game-result-chip',
    templateUrl: './game-result-chip.component.html',
    styleUrls: ['./game-result-chip.component.scss']
})
export class GameResultChipComponent implements OnChanges {
    public readonly gameStatusEnum: typeof GameStatus;
    @Input() public gameState: GameState | undefined | null;
    @Input() public blackImgSrc: string | undefined | null;
    @Input() public whiteImgSrc: string | undefined | null;

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
