import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { IonicModule } from '@ionic/angular';
import { GameBoardModule } from './game-board/game-board.module';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
    declarations: [GameComponent],
    imports: [
        CommonModule,
        IonicModule,
        GameBoardModule,
        GameRoutingModule
    ],
    exports: [GameComponent]
})
export class GameModule { }
