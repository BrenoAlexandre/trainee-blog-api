import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../entities/User.Entity';

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Admin',
            email: 'admin@mail.com',
            password: 'admin123',
          },
          {
            name: 'John Doe',
            email: 'john@mail.com',
            password: '123123',
          },
        ])
        .execute();
    }
  }
}
