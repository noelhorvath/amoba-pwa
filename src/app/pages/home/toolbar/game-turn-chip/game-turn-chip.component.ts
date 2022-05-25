import { Component, Input } from '@angular/core';
import { PlayerColor } from '../../../../shared/enums/Player.enums';
import { GameSettingsService } from '../../../../services/game-settings/game-settings.service';

@Component({
    selector: 'app-game-turn-chip',
    templateUrl: './game-turn-chip.component.html',
    styleUrls: ['./game-turn-chip.component.scss']
})
export class GameTurnChipComponent {
    @Input() public turnIndex: number | undefined | null;
    @Input() public playerTurn: PlayerColor | undefined | null;
    @Input() public whiteImgSrc: string | undefined | null;
    @Input() public blackImgSrc: string | undefined | null;

    public constructor() { }

    public getImgSrc(): string {
        switch (this.playerTurn) {
            case PlayerColor.WHITE:
                return this.whiteImgSrc ?? GameSettingsService.DEFAULT_WHITE_EMOTE.urls[0];
            case PlayerColor.BLACK:
                return this.blackImgSrc ?? GameSettingsService.DEFAULT_BLACK_EMOTE.urls[0];
            default:
                throw new Error('Player is undefined!');
        }
    }
}
