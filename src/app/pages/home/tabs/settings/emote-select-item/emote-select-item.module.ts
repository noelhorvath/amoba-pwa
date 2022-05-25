import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmoteSelectItemComponent } from './emote-select-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [EmoteSelectItemComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [EmoteSelectItemComponent]
})
export class EmoteSelectItemModule {
}
