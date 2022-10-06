import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeder } from 'typeorm-extension';
import MainSeeder from './functional/seeds/main.seeder';
import logger from '../src/config/logger';
import config from '../src/config/config';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.testPort,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  logger: 'advanced-console',
  entities: ['./src/database/entities/*.Entity{.js,.ts}'],
  migrations: ['./src/database/migrations/*{.js,.ts}'],
  seeds: [MainSeeder],
  synchronize: false,
  logging: false,
};

const AppDataSource = new DataSource(options);
export const connection = {
  async create() {
    try {
      await AppDataSource.initialize();
      logger.info('Postgres connected :>> AppDataSource initialized.');
      await runSeeder(AppDataSource, MainSeeder);
      logger.info('Postgres populated :>> Seeds ran.');
    } catch (err) {
      logger.error('Error during test AppDataSource initialization :>>', err);
    }
  },

  async close() {
    const entities = AppDataSource.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    AppDataSource.destroy();
  },
};

export default AppDataSource;
