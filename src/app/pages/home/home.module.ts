import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { TabBarModule } from './tab-bar/tab-bar.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        TabBarModule,
        ToolbarModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }
