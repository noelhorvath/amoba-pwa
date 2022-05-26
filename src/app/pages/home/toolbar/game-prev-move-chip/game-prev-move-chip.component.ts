import { Component, Input } from '@angular/core';
import { Cell } from '../../../../shared/models/classes/Cell';

@Component({
    selector: 'app-game-prev-move-chip',
    templateUrl: './game-prev-move-chip.component.html',
    styleUrls: ['./game-prev-move-chip.component.scss'],
})
export class GamePrevMoveChipComponent {
    @Input() public prevMove: Cell | undefined;

    public constructor() { }
}
