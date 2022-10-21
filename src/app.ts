import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import { handleErrorMiddleware } from './middlewares/handleError';
import { RegisterRoutes } from './routes';

const corsOptions = {
  exposedHeaders: 'Authorization',
};

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.options('*', cors());

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

RegisterRoutes(app);
app.use(handleErrorMiddleware);

export default app;
