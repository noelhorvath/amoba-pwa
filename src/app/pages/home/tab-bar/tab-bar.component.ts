import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-tab-bar',
    templateUrl: './tab-bar.component.html',
    styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent {
    public colors: { [key: string]: string };
    @Output() public tabSelect: EventEmitter<string>;

    public constructor() {
        this.colors = { game: 'primary', settings: 'primary' };
        this.tabSelect = new EventEmitter<string>();
    }

    public tabChangeHandler(event: { tab: string }): void {
        Object.keys(this.colors).map( (key: string) => this.colors[key] = 'primary' );
        switch (event.tab) {
            case 'game':
                this.colors[event.tab] = 'secondary';
                break;
            case 'settings':
                this.colors[event.tab] = 'secondary';
                break;
        }
        this.tabSelect.emit(event.tab);
    }
}
