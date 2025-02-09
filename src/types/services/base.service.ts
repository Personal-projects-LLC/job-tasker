import { ServerActionResponse } from '@/types';

export interface BaseService<T, CreateDTO, UpdateDTO> {
  get(id: string): Promise<ServerActionResponse<T>>;
  getAll(params?: unknown): Promise<ServerActionResponse<T[]>>;
  create(data: CreateDTO): Promise<ServerActionResponse<T>>;
  update(id: string, data: UpdateDTO): Promise<ServerActionResponse<T>>;
  delete(id: string): Promise<ServerActionResponse<boolean>>;
}
