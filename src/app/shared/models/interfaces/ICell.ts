import { IRecordCoordinate } from './IRecordCoordinate';

export interface ICell<ValueType> extends IRecordCoordinate {
    readonly value: ValueType;
}
