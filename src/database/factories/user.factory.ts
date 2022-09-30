import { setSeederFactory } from 'typeorm-extension';
import User from '../entities/User.Entity';

export default setSeederFactory(User, () => {
  const user = new User();
  user.name = 'Admin';
  user.email = 'admin@admin.com';
  user.password = 'admin123';
  user.role = 'admin';

  return user;
});
