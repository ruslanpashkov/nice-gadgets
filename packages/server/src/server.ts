'use strict';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { productRouter } from './routes/product.router.js';
import { orderRouter } from './routes/order.router.js';
import { initDB } from './utils/initDB.js';

dotenv.config();

const { CLIENT_URL } = process.env;

const corsOptions: cors.CorsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

export const createServer = (): express.Application => {
  const app = express();

  initDB();

  app.use(cors(corsOptions));
  app.use('/img', express.static(path.join('img')));
  app.use('/products', express.json(), productRouter);
  app.use('/orders', express.json(), orderRouter);

  app.use('/', (req, res) => {
    res.send('huh?');
  });

  return app;
};
