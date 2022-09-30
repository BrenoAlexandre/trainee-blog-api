import { DataSource } from 'typeorm';
import config from '../config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  driver: 'postgres',
  logger: 'advanced-console',
  entities: [`${__dirname}/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
