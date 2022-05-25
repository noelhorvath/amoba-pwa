import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTurnItemComponent } from './game-turn-item.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [GameTurnItemComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GameTurnItemComponent]
})
export class GameTurnItemModule {
}
