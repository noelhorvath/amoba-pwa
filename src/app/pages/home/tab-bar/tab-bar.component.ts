import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-tab-bar',
    templateUrl: './tab-bar.component.html',
    styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent {
    @Output() public tabSelect: EventEmitter<string>;

    public constructor() {
        this.tabSelect = new EventEmitter<string>();
    }

    public tabChangeHandler(event: { tab: string }): void {
        this.tabSelect.emit(event.tab);
    }
}
