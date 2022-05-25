import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { IonicModule } from '@ionic/angular';
import { GameBoardModule } from './game-board/game-board.module';
import { GameRoutingModule } from './game-routing.module';
import { GameResultItemModule } from './game-result-item/game-result-item.module';
import { GameTurnItemModule } from './game-turn-item/game-turn-item.module';

@NgModule({
    declarations: [GameComponent],
    imports: [
        CommonModule,
        IonicModule,
        GameBoardModule,
        GameRoutingModule,
        GameResultItemModule,
        GameTurnItemModule
    ],
    exports: [GameComponent]
})
export class GameModule { }
