import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import config from '../config/config';
import logger from '../config/logger';
import MainSeeder from './seeds/main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  logger: 'advanced-console',
  entities: [`${__dirname}/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  seeds: [MainSeeder],
  synchronize: false,
  logging: false,
};

const AppDataSource = new DataSource(options);
export const createDb = async () => {
  try {
    if (config.postgresDb.host) {
      await AppDataSource.initialize();
      logger.info('Postgres connected :>> AppDataSource initialized.');
    }
  } catch (err) {
    logger.error('Error during AppDataSource initialization:', err);
    process.exit(1);
  }
};

export const closeDb = async () => {
  try {
    if (config.postgresDb.host) {
      await AppDataSource.destroy();
      logger.info('Postgres closed :>> AppDataSource connection closed.');
    }
  } catch (err) {
    logger.error('Error during test database closing sequence :>>', err);
    process.exit(1);
  }
};

export default AppDataSource;
