import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../../../shared/models/classes/Board';
import { BoardCellValue } from '../../../../../shared/enums/BoardCellValue.enum';
import { PlayerColor } from '../../../../../shared/enums/Player.enums';
import { Cell } from '../../../../../shared/models/classes/Cell';
import { GameEngineService } from '../../../../../services/game-engine/game-engine.service';
import { GameMode } from '../../../../../shared/enums/GameEngine.enums';
import { GameState } from '../../../../../shared/types/GameEngineTypes';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
    @Input() public board: Board | undefined | null;
    @Input() public gameMode: GameMode | undefined;
    @Input() public gameState: GameState | undefined;
    @Input() public whiteImgSrc: string | undefined;
    @Input() public blackImgSrc: string | undefined;
    @Input() public emptyImgSrc: string | undefined;
    @Input() public isGameRunning: boolean;
    @Input() public playerTurn: PlayerColor | undefined;
    @Input() public isPreview: boolean | undefined;
    @Input() public isAITurn: boolean;
    @Output() public moveSet: EventEmitter<Cell>;

    public constructor() {
        this.isAITurn = false;
        this.moveSet = new EventEmitter<Cell>();
        this.isGameRunning = false;
    }

    public setMove(cell: Cell): void {
        if (this.playerTurn === undefined) {
            throw new Error('Player turn is not set!');
        }
        this.moveSet.emit(new Cell(cell.x, cell.y, GameEngineService.playerColorToBoardCellValue(this.playerTurn)));
    }

    public createCell(x: number, y: number, value: BoardCellValue): Cell {
        return new Cell(x, y, value);
    }

    public trackByRow(index: number, _item: BoardCellValue[]): number {
        return index;
    }

    public trackByCellValue(index: number, _item: BoardCellValue): number {
        return index;
    }
}
