import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler, notFound } from './middlewares/errorHandler';

const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp();