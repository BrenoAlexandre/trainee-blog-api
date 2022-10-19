import User from '../../../database/entities/User.Entity';

export interface ICreateCategoryInput {
  title: string;
  user: User;
}
