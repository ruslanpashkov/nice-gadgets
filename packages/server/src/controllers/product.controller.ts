'use strict';

import { Product } from '../models/Product.model.js';
import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';
import {
  checkValidCategory,
  formatMultipleProducts,
  formatSingleProduct,
  getPaginationInfo,
  getUniqueItems,
} from '../utils/helpers.js';

class ProductController {
  private static instance: ProductController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
  }

  getProductsByDiscount: Controller = async (_, res) => {
    try {
      const countProductsPerCategory = 4;
      const discountProducts =
        await productService.getDiscountProductsPerCategory(
          countProductsPerCategory,
        );

      if (!discountProducts?.length) {
        return res.status(404).json({ message: 'No products found' });
      }

      const formattedProducts = formatMultipleProducts(discountProducts);
      return res.status(200).json(formattedProducts);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch discount products',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getProductsByNew: Controller = async (_, res) => {
    try {
      const countProductsPerCategory = 12;
      const newProducts = await productService.getNewProducts(
        countProductsPerCategory,
      );

      if (!newProducts?.length) {
        return res.status(404).json({ message: 'No products found' });
      }

      const formattedProducts = formatMultipleProducts(newProducts);
      return res.status(200).json(formattedProducts);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch new products',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getCountOfProducts: Controller = async (req, res) => {
    try {
      const { category } = req.query;

      if (!category) {
        return res.status(400).json({ message: 'Category is required' });
      }

      const normalizeCategory = String(category).toLowerCase();
      const isValidCategory = await checkValidCategory(normalizeCategory);

      if (!isValidCategory) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const count = await productService.getCountProducts(normalizeCategory);

      if (!count) {
        return res.status(404).json({ message: 'No products found' });
      }

      return res.status(200).json(count);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch product count',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getRecommendedProducts: Controller = async (req, res) => {
    try {
      const { price, fullPrice, category } = req.query;

      if (!price || !fullPrice || !category) {
        return res.status(400).json({
          message:
            'Missing required parameters: price, fullPrice, and category are required',
        });
      }

      const normalizePrice = Number(price);
      const normalizeFullPrice = Number(fullPrice);
      const normalizeCategory = String(category).toLowerCase();
      const priceLimit = 200;
      const limit = 4;

      if (isNaN(normalizePrice) || isNaN(normalizeFullPrice)) {
        return res.status(400).json({ message: 'Invalid price values' });
      }

      const isValidCategory = await checkValidCategory(normalizeCategory);

      if (!isValidCategory) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const recommendedProducts = await productService.getRecommended(
        normalizePrice,
        normalizeFullPrice,
        normalizeCategory,
        priceLimit,
        limit,
      );

      if (!recommendedProducts) {
        return res.status(404).json({ message: 'No products found' });
      }

      const allRecommendedProducts = [
        ...recommendedProducts.recommendedByPrice,
        ...recommendedProducts.recommendedByFullPrice,
        ...recommendedProducts.recommendedByCategory,
      ];

      const formattedProducts = formatMultipleProducts(allRecommendedProducts);
      const uniquesProducts = getUniqueItems<Product, 'id'>(
        formattedProducts,
        'id',
      );

      return res.status(200).json(uniquesProducts);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch recommended products',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getProductsBySearch: Controller = async (req, res) => {
    try {
      const { query } = req.query;

      if (!query) {
        return res
          .status(400)
          .json({ message: 'Missing required query parameter' });
      }

      const normalizeQuery = String(query).trim();
      if (!normalizeQuery.length) {
        return res
          .status(400)
          .json({ message: 'Search query cannot be empty' });
      }

      const count = 4;
      const products = await productService.getBySearch(normalizeQuery, count);
      const formattedProducts = formatMultipleProducts(products);

      return res.status(200).json(formattedProducts);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to search products',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getProductsByCategory: Controller = async (req, res) => {
    try {
      const { initialLimit, offset } = getPaginationInfo(req);
      const { sortBy, category } = req.query;

      if (!category) {
        return res
          .status(400)
          .json({ message: 'Missing required category parameter' });
      }

      const normalizeSortBy = String(sortBy || '');
      const normalizeCategory = String(category).toLowerCase();
      const isValidCategory = await checkValidCategory(normalizeCategory);

      if (!isValidCategory) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const products = await productService.getProductsByCategory(
        offset,
        initialLimit,
        normalizeSortBy,
        normalizeCategory,
      );

      if (!products?.rows?.length) {
        return res.status(404).json({ message: 'No products found' });
      }

      const formattedProducts = formatMultipleProducts(products.rows);
      return res
        .status(200)
        .json({ count: products.count, data: formattedProducts });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch products by category',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getProductByDeviceId: Controller = async (req, res) => {
    try {
      const { deviceId } = req.params;

      if (!deviceId) {
        return res.status(400).json({ message: 'Device ID is required' });
      }

      const normalizeDeviceId = String(deviceId).toLowerCase();
      const productData = await productService.getByDeviceId(normalizeDeviceId);

      if (!productData) {
        return res.status(404).json({
          message: `Product with ID '${deviceId}' not found`,
        });
      }

      const formattedPhone = formatSingleProduct(productData);
      return res.status(200).json(formattedPhone);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch product by device ID',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

export const productController = ProductController.getInstance();
