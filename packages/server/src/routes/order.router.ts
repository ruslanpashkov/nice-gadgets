'use strict';

import express from 'express';
import { orderController } from '../controllers/order.controller.js';

export const orderRouter: express.Router = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:id', orderController.getOrder);
