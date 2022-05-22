import { IDBPDatabase } from 'idb';

export interface IIndexedDBBase<DBModel, Model> {
    readonly db: Promise<IDBPDatabase<DBModel>>;
    add(model: Model): Promise<void>;
    update(model: Model): Promise<void>;
    get(id: string): Promise<Model>;
    delete?(id: string): Promise<void>;
    clearStore?(): Promise<void>;
}
