import { IPagination } from './IPagination';

export interface IFindParams {
  pagination: IPagination;
  order: 'ASC' | 'DESC';
}
