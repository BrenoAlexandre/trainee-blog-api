import { IUser } from '../../../models/user.model';

export interface ICreateCategoryInput {
  title: string;
  user: IUser;
}
