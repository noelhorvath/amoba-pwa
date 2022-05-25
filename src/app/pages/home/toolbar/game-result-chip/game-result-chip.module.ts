import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameResultChipComponent } from './game-result-chip.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [GameResultChipComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GameResultChipComponent]
})
export class GameResultChipModule {
}
