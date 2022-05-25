import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardCellComponent } from './game-board-cell.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [GameBoardCellComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GameBoardCellComponent]
})
export class GameBoardCellModule {
}
