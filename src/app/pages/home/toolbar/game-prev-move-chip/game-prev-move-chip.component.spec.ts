import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamePrevMoveChipComponent } from './game-prev-move-chip.component';

describe('GamePrevMoveChipComponent', () => {
    let component: GamePrevMoveChipComponent;
    let fixture: ComponentFixture<GamePrevMoveChipComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GamePrevMoveChipComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GamePrevMoveChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
