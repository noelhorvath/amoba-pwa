import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { IonicModule } from '@ionic/angular';
import { GameTurnChipModule } from './game-turn-chip/game-turn-chip.module';
import { GamePrevMoveChipModule } from './game-prev-move-chip/game-prev-move-chip.module';
import { GameResultChipModule } from './game-result-chip/game-result-chip.module';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        IonicModule,
        GameTurnChipModule,
        GamePrevMoveChipModule,
        GameResultChipModule
    ],
    exports: [ToolbarComponent]
})
export class ToolbarModule { }
