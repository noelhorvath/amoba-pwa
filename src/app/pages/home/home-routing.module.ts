import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { GameModule } from './tabs/game/game.module';
import { SettingsModule } from './tabs/settings/settings.module';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'game',
                loadChildren: (): Promise<GameModule> => import('../home/tabs/game/game.module').then(m => m.GameModule),
            },
            {
                path: 'settings',
                loadChildren: (): Promise<SettingsModule> => import('../home/tabs/settings/settings.module').then(m => m.SettingsModule),
            },
            {
                path: '',
                redirectTo: '/home/game',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: '/home/game',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
