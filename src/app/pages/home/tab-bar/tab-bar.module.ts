import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBarComponent } from './tab-bar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [TabBarComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [TabBarComponent]
})
export class TabBarModule { }
