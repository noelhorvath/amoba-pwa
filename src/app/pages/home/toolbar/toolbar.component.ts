import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    @Input() public title: string;

    public constructor() {
        this.title = 'Toolbar';
    }
}
