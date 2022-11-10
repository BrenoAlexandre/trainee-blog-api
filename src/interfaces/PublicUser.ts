import User from '../database/entities/User.Entity';

type PublicUser = Omit<User, 'password'>;

export default PublicUser;
