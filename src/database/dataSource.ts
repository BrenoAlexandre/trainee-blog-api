import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import config from '../config/config';
import logger from '../config/logger';

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
  synchronize: false,
  logging: false,
};

const AppDataSource = new DataSource(options);
AppDataSource.initialize()
  .then(() => {
    logger.info('Postgres connected :>> AppDataSource initialized.');
  })
  .catch((err) => {
    logger.error('Error during AppDataSource initialization:', err);
  });

// runSeeders(AppDataSource);

export default AppDataSource;
