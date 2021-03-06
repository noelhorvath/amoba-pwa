import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BoardCellValue } from '../../../../../../shared/enums/BoardCellValue.enum';
import { Cell } from '../../../../../../shared/models/classes/Cell';
import { PlayerColor } from '../../../../../../shared/enums/Player.enums';
import { GameMode } from '../../../../../../shared/enums/GameEngine.enums';
import { GameState } from '../../../../../../shared/types/GameEngineTypes';
import { GameSettingsService } from '../../../../../../services/game-settings/game-settings.service';
import { IonImg } from '@ionic/angular';

@Component({
    selector: 'app-game-board-cell',
    templateUrl: './game-board-cell.component.html',
    styleUrls: ['./game-board-cell.component.scss'],
})
export class GameBoardCellComponent implements OnChanges {
    public imgClasses: string[];
    @Input() public cell: Cell | undefined | null;
    @Input() public playerTurn: PlayerColor | undefined | null;
    @Input() public gameMode: GameMode | undefined | null;
    @Input() public gameState: GameState | undefined | null;
    @Input() public whiteImgSrc: string | undefined | null;
    @Input() public blackImgSrc: string | undefined | null;
    @Input() public emptyImgSrc: string | undefined | null;
    @Input() public isGameRunning: boolean | undefined | null;
    @Input() public isAITurn: boolean;
    @Input() public isPreview: boolean | undefined | null;
    @Output() public cellClick: EventEmitter<Cell | Error>;

    public constructor() {
        this.isPreview = true;
        this.isAITurn = false;
        this.imgClasses = ['normal'];
        this.cellClick = new EventEmitter<Cell | Error>();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['gameState']) {
            this.imgClasses[0] = this.gameState?.winnerCords?.find(c => c.y === this.cell?.y && c.x === this.cell.x)
                ? 'winner' : 'normal';
        }
    }

    public getImgFromCellValue(): string {
        if (!this.cell) {
            throw new Error('Cell attribute is not set!');
        }
        switch (this.cell.value) {
            case BoardCellValue.BLACK:
                return this.blackImgSrc ?? GameSettingsService.DEFAULT_BLACK_EMOTE.urls[0];
            case BoardCellValue.WHITE:
                return this.whiteImgSrc ?? GameSettingsService.DEFAULT_WHITE_EMOTE.urls[0];
            case BoardCellValue.EMPTY:
                return this.emptyImgSrc ?? GameSettingsService.DEFAULT_EMPTY_EMOTE.urls[0];
            default:
                throw new Error('Invalid board cell value!');
        }
    }

    public cellMouseEnterHandler(img: IonImg): void {
        if (this.isGameRunning === undefined) {
            throw new Error('isGameRunning attribute is not set!');
        } else if (this.playerTurn === undefined) {
            throw new Error('playerTurn attribute is not set!');
        }
        if (this.isGameRunning && this.cell?.value === BoardCellValue.EMPTY) {
            switch (this.playerTurn) {
                case PlayerColor.BLACK:
                    img.src = this.blackImgSrc ?? GameSettingsService.DEFAULT_BLACK_EMOTE.urls[0];
                    break;
                case PlayerColor.WHITE:
                    img.src = this.whiteImgSrc ?? GameSettingsService.DEFAULT_WHITE_EMOTE.urls[0];
                    break;
                default:
                    throw new Error('Invalid player color!');
            }
        }
    }
    public cellMouseLeaveHandler(img: IonImg): void {
        if (this.isGameRunning === undefined) {
            throw new Error('isGameRunning attribute is not set!');
        } else if (this.playerTurn === undefined) {
            throw new Error('playerTurn attribute is not set!');
        }
        if (this.isGameRunning && this.cell?.value === BoardCellValue.EMPTY) {
            img.src = this.emptyImgSrc ?? GameSettingsService.DEFAULT_EMPTY_EMOTE.urls[0];
        }
    }

    public async clickHandler(): Promise<void> {
        if (!this.cell) {
            this.cellClick.emit(new Error('Cell attribute is not set!'));
            return;
        } else if (this.cell.value !== BoardCellValue.EMPTY) {
            this.cellClick.emit(new Error('Invalid move!'));
            return;
        }

        this.cellClick.emit(this.cell);
    }
}
