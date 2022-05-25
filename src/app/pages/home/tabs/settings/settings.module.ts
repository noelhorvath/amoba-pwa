import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { IonicModule } from '@ionic/angular';
import { EmoteSelectItemModule } from './emote-select-item/emote-select-item.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmoteApiService } from '../../../../services/emote-api/emote-api.service';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        IonicModule,
        EmoteSelectItemModule,
        SettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [SettingsComponent],
    providers: [EmoteApiService]
})
export class SettingsModule { }
