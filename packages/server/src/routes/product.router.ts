'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter: express.Router = express.Router();

productRouter.get('/', productController.getProductsByCategory);
productRouter.get('/count', productController.getCountOfProducts);
productRouter.get('/new', productController.getProductsByNew);
productRouter.get('/discount', productController.getProductsByDiscount);
productRouter.get('/recommended', productController.getRecommendedProducts);
productRouter.get('/search', productController.getProductsBySearch);
productRouter.get('/:deviceId', productController.getProductByDeviceId);
