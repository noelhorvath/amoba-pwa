import { IIndexedDBBase } from '../interfaces/IIndexedDBBase';
import { IDBPDatabase } from 'idb';

export abstract class IndexedDBBase<DBModel, Model>  implements IIndexedDBBase<DBModel, Model> {
    public readonly db: Promise<IDBPDatabase<DBModel>>;

    protected constructor(db: Promise<IDBPDatabase<DBModel>>) {
        this.db = db;
    }

    public abstract add(model: Model): Promise<void>;
    public abstract get(id: string): Promise<Model>;
    public abstract update(model: Model): Promise<void>;
}
