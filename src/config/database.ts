// import * as ormConfig from '../database/dataSource';
// import config from './config';
// import logger from './logger';

// async function database() {
//   try {
//     if (config.postgresDb.host) {
//       ormConfig.AppDataSource.initialize()
//         .then(() => {
//           logger.info('Postgres connected :>> AppDataSource initialized.');
//         })
//         .catch((err) => {
//           logger.error('Error during AppDataSource initialization:', err);
//         });
//     }
//   } catch (error) {
//     logger.error('Could not connect to db');
//     logger.error(error);
//     process.exit(1);
//   }
// }

// export default database;
