export interface BaseRepository<
  T,
  CreateDTO,
  UpdateDTO,
  CreateParams = CreateDTO,
> {
  findById(id: string): Promise<T | null>;
  findMany(params?: unknown): Promise<T[]>;
  create(data: CreateParams): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<boolean>;
}
