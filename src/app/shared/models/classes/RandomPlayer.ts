import { IPlayer } from '../interfaces/IPlayer';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { Cell } from './Cell';
import { Board } from './Board';
import { PlayerColor, PlayerType } from '../../enums/Player.enums';
import { RecordCoordinate } from './RecordCoordinate';
import { GameEngineService } from '../../../services/game-engine/game-engine.service';

export class RandomPlayer implements IPlayer<BoardCellValue> {
    private freeCells: RecordCoordinate[];
    public color: PlayerColor;
    public type: PlayerType;

    public constructor(color: PlayerColor, board: Board) {
        this.color = color;
        this.type = PlayerType.AI;
        this.freeCells = [];
        for (let i = 0; i < board.boardSize; i++) {
            for (let j = 0; j < board.boardSize; j++) {
                if (board.cells[i][j] === BoardCellValue.EMPTY) {
                    this.freeCells.push(new RecordCoordinate(j, i));
                }
            }
        }
    }

    public getMove(board: Board, prevMove?: Cell): Cell {
        if (board.isFilled()) {
            throw new Error('Board is full!');
        }
        if (prevMove !== undefined) {
            this.freeCells = this.freeCells.filter((cell: RecordCoordinate) => cell.x !== prevMove.x || cell.y !== prevMove.y);
        }
        const random = Math.floor(Math.random() * this.freeCells.length);
        const selected = this.freeCells[random];
        this.freeCells = this.freeCells.filter((cell: RecordCoordinate) => cell.x !== selected.x || cell.y !== selected.y);
        return new Cell(selected.x, selected.y, GameEngineService.playerColorToBoardCellValue(this.color));
    }
}
