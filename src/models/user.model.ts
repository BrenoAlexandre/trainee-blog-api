export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: 'user' | 'admin';
}
