import { IPlayer } from '../interfaces/IPlayer';
import { BoardCellValue } from '../../enums/BoardCellValue.enum';
import { PlayerColor, PlayerType } from '../../enums/Player.enums';

export class RealPlayer implements IPlayer<BoardCellValue> {
    public color: PlayerColor;
    public type: PlayerType;

    public constructor(color: PlayerColor) {
        this.color = color;
        this.type = PlayerType.REAL;
    }
}
