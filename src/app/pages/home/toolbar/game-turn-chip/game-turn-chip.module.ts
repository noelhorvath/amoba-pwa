import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTurnChipComponent } from './game-turn-chip.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [GameTurnChipComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GameTurnChipComponent]
})
export class GameTurnChipModule {
}
