import { TestBed } from '@angular/core/testing';

import { EmoteApiService } from './emote-api.service';

describe('EmoteApiService', () => {
    let service: EmoteApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EmoteApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
