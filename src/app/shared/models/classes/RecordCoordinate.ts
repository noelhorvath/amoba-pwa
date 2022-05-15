import { IRecordCoordinate } from '../interfaces/IRecordCoordinate';

export class RecordCoordinate implements IRecordCoordinate {
    public readonly x: number;
    public readonly y: number;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public copy(): RecordCoordinate {
        return new RecordCoordinate(this.x, this.y);
    }
}
