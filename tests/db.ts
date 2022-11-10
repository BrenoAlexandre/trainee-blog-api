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
  async seed() {
    try {
      await runSeeder(AppDataSource, MainSeeder);
      logger.info('Postgres populated :>> Seeds ran.');
    } catch (err) {
      logger.error('Error during test database seeding :>>', err);
    }
  },

  async create() {
    try {
      await AppDataSource.initialize();
      logger.info('Postgres connected :>> AppDataSource initialized.');
    } catch (err) {
      logger.error('Error during test database initialization :>>', err);
    }
  },

  async close() {
    try {
      AppDataSource.destroy();
      logger.info('Postgres close :>> AppDataSource connection closed.');
    } catch (err) {
      logger.error('Error during test database closing sequence :>>', err);
    }
  },

  async clean() {
    try {
      const entities = AppDataSource.entityMetadatas;

      entities.forEach(async (entity) => {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      });
      logger.info(
        'Postgres cleanse :>> AppDataSource repository data deleted.'
      );
    } catch (err) {
      logger.error('Error during test database cleaning :>>', err);
    }
  },
};

export default AppDataSource;
