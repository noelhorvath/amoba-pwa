import { Component, Input } from '@angular/core';
import { Cell } from '../../../../shared/models/classes/Cell';
import { GameSettingsService } from '../../../../services/game-settings/game-settings.service';
import { BoardCellValue } from '../../../../shared/enums/BoardCellValue.enum';

@Component({
    selector: 'app-game-prev-move-chip',
    templateUrl: './game-prev-move-chip.component.html',
    styleUrls: ['./game-prev-move-chip.component.scss'],
})
export class GamePrevMoveChipComponent {
    @Input() public whiteImgSrc: string | undefined | null;
    @Input() public blackImgSrc: string | undefined | null;
    @Input() public prevMove: Cell | undefined;

    public constructor() { }

    public getImgFromCellValueSrc(): string {
        switch (this.prevMove?.value) {
            case BoardCellValue.WHITE:
                return this.whiteImgSrc ?? GameSettingsService.DEFAULT_WHITE_EMOTE.urls[0];
            case BoardCellValue.BLACK:
                return this.blackImgSrc ?? GameSettingsService.DEFAULT_BLACK_EMOTE.urls[0];
            default:
                throw new Error('Previous move is undefined or empty!');
        }
    }
}
