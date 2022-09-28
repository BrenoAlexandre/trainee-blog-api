import User from '../database/entities/User.Entity';

export interface CategoryInput {
  title: string;
  // abbreviation: string;
  // color: string;
  owner: User;
}
