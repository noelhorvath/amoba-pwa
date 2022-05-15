import { ICoordinate } from '../interfaces/ICoordinate';
import { RecordCoordinate } from './RecordCoordinate';

export class Coordinate implements ICoordinate {
    public x: number;
    public y: number;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public copy(): ICoordinate {
        return new Coordinate(this.x, this.y);
    }

    public toImmutable(): RecordCoordinate {
        return new RecordCoordinate(this.x, this.y);
    }
}
