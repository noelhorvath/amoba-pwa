import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameEngineService } from './services/game-engine/game-engine.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GameSettingsService } from './services/game-settings/game-settings.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ServiceWorkerModule.register(
            'ngsw-worker.js',
            {
                enabled: environment.production,
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000'
            }
        )
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        GameEngineService,
        GameSettingsService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
