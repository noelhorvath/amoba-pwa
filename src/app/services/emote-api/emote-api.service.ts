import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IFetchError } from '../../shared/models/interfaces/IFetchError';
import { Emote } from '../../shared/models/classes/Emote';
import { fromFetch } from 'rxjs/fetch';
import { IEmoteResponse } from '../../shared/models/interfaces/IEmoteResponse';

@Injectable({
    providedIn: 'root'
})

export class EmoteApiService {
    public static readonly API_URL = 'https://api.7tv.app/v2';

    public constructor() { }

    // ex: https://api.7tv.app/v2/users/IgorCykel/emotes
    public getUserEmotesUrl(user: string): string {
        return EmoteApiService.API_URL + `/users/${user}/emotes`;
    }

    public getEmotes(user: string): Observable<Emote[] | undefined> {
        return fromFetch(this.getUserEmotesUrl(user))
            .pipe(
                switchMap( (response: Response) => response.json()),
                map( (response: IEmoteResponse[] | IFetchError) => {
                    if (!(response instanceof Array)) {
                        console.error(response.message);
                    }
                    return response instanceof Array ? response.filter( (emote: IEmoteResponse) => emote.height[0] === emote.width[0])
                        .map( (emote: IEmoteResponse) => new Emote(emote)) : undefined;
                }),
                catchError( (error: any) => {
                    console.error(error);
                    return of(undefined);
                })
            );
    }
}
