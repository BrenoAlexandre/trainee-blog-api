export interface RequestDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: 'user' | 'admin';
}
