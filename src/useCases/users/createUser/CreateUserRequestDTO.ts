/**
 * @example {
 *  "name": "John Doe",
 *  "email": "john@mail.com",
 *  "password": "123secure",
 *  "passwordConfirmation": "123secure",
 *  "role": "user"
 * }
 */
export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role?: 'user' | 'admin';
}
