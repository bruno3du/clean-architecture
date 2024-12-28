export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  findOne(id: string): Promise<T | undefined>;
  findAll(input?: any): Promise<T[]>;
  update(entity: T): Promise<void>;
}
