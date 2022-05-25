import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board.component';
import { IonicModule } from '@ionic/angular';
import { GameBoardCellModule } from './game-board-cell/game-board-cell.module';

@NgModule({
    declarations: [GameBoardComponent],
    imports: [
        CommonModule,
        IonicModule,
        GameBoardCellModule
    ],
    exports: [GameBoardComponent]
})
export class GameBoardModule {
}
