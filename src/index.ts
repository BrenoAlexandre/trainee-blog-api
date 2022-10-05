import app from './app';
import './database/dataSource';
import config, { environments } from './config/config';
import logger from './config/logger';
import swaggerDocs from './config/swagger';

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});
