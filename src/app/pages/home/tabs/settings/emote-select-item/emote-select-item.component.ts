import { Component, Input } from '@angular/core';
import { Emote } from '../../../../../shared/models/classes/Emote';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-emote-select-item',
    templateUrl: './emote-select-item.component.html',
    styleUrls: ['./emote-select-item.component.scss']
})
export class EmoteSelectItemComponent {
    @Input() public emotes: Emote[] | undefined | null;
    @Input() public player: 'white' | 'black' | undefined | null;
    @Input() public control: FormControl | undefined | null;

    public constructor() {}

    public trackByEmote(_index: number, item: Emote): string {
        return item.id;
    }
}
