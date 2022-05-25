import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public selectedTab: string | undefined;

    public constructor() { }

    public tabSelectChangeHandler(tab: string | undefined): void {
        this.selectedTab = tab;
    }
}
