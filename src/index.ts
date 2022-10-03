import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import logger from './config/logger';
import routes from './routes';
import swaggerDocs from './config/swagger';
import deserializeUser from './middlewares/deserializeUser';
import { handleErrorMiddleware } from './middlewares/handleError';
import './database/dataSource';

const corsOptions = {
  exposedHeaders: 'Authorization',
};

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.options('*', cors());
app.use(deserializeUser);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  routes(app);
  app.use(handleErrorMiddleware);

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});

export default app;
