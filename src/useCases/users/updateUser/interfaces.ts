import { IUser } from '../../../models/user.model';

export interface IUpdateInput {
  name: string;
  user: IUser;
}
