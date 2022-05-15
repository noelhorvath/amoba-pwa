import { IEmote } from '../interfaces/IEmote';
import { IEmoteResponse } from '../interfaces/IEmoteResponse';

export class Emote implements IEmote {
    public id: string;
    public name: string;
    public urls: string[];

    public constructor(other: IEmoteResponse) {
        this.id = other.id;
        this.name = other.name;
        const copy = other.urls.slice(0);
        this.urls = copy.map( url => url[1]);
    }
}
