import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePrevMoveChipComponent } from './game-prev-move-chip.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [GamePrevMoveChipComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GamePrevMoveChipComponent]
})
export class GamePrevMoveChipModule {
}
