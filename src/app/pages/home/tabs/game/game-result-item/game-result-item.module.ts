import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameResultItemComponent } from './game-result-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [GameResultItemComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [GameResultItemComponent]
})
export class GameResultItemModule {
}
