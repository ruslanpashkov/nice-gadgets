'use strict';

import { Op, Sequelize } from 'sequelize';
import { Capacity } from '../models/Capacity.model.js';
import { Category } from '../models/Category.model.js';
import { Color } from '../models/Color.model.js';
import { Description } from '../models/Description.model.js';
import { Detail } from '../models/Detail.model.js';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { Namespace } from '../models/Namespace.model.js';
import { NamespaceCapacity } from '../models/NamespaceCapacity.model.js';
import { Product } from '../models/Product.model.js';
import { generateSortingOrder } from '../utils/helpers.js';

interface RecommendedProducts {
  recommendedByPrice: Product[];
  recommendedByFullPrice: Product[];
  recommendedByCategory: Product[];
}

interface FullProductData {
  product: Product | null;
  imagesColor: ImagesColor[];
  capacities: Capacity[];
  descriptions: Description[];
  colors: ImagesColor[];
}

class ProductService {
  private static instance: ProductService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async getDiscountProductsPerCategory(
    countPerCategory: number,
  ): Promise<Product[]> {
    try {
      const categories = await Category.findAll({
        attributes: ['id'],
      });

      const productsPerCategoryPromises = categories.map((category) =>
        Product.findAll({
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['title'],
            },
          ],
          attributes: {
            exclude: ['createdAt', 'year', 'categoryId', 'colorId'],
          },
          where: { categoryId: category.id },
          limit: countPerCategory,
          order: [
            [
              Sequelize.literal('100 * ("fullPrice" - "price") / "fullPrice"'),
              'DESC',
            ],
          ],
        }),
      );

      const productsPerCategory = await Promise.all(
        productsPerCategoryPromises,
      );
      return productsPerCategory.flat();
    } catch (error) {
      console.error('Error getting discount products:', error);
      throw error;
    }
  }

  async getNewProducts(count: number): Promise<Product[]> {
    try {
      return await Product.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'year', 'categoryId', 'colorId'],
        },
        order: [['year', 'DESC']],
        limit: count,
      });
    } catch (error) {
      console.error('Error getting new products:', error);
      throw error;
    }
  }

  async getCountProducts(category: string): Promise<number> {
    try {
      const currentCategory = await Category.findOne({
        where: { title: category },
      });

      if (!currentCategory) {
        return 0;
      }

      return await Product.count({
        where: { categoryId: currentCategory.id },
      });
    } catch (error) {
      console.error('Error getting product count:', error);
      throw error;
    }
  }

  async getRecommended(
    price: number,
    fullPrice: number,
    category: string,
    priceLimit: number,
    limit: number,
  ): Promise<RecommendedProducts> {
    try {
      const currentCategory = await Category.findOne({
        where: { title: category },
      });

      if (!currentCategory) {
        throw new Error(`Category ${category} not found`);
      }

      const categoryId = currentCategory.dataValues.id;
      const commonInclude = [
        {
          model: Category,
          as: 'category',
          attributes: ['title'],
        },
      ];
      const commonAttributes = {
        exclude: ['createdAt', 'year', 'categoryId', 'colorId'],
      };

      const [
        recommendedByPrice,
        recommendedByFullPrice,
        recommendedByCategory,
      ] = await Promise.all([
        Product.findAll({
          include: commonInclude,
          attributes: commonAttributes,
          where: {
            price: {
              [Op.between]: [price - priceLimit, price + priceLimit],
            },
          },
          order: Sequelize.literal('RANDOM()'),
          limit,
        }),
        Product.findAll({
          include: commonInclude,
          attributes: commonAttributes,
          where: {
            price: {
              [Op.between]: [fullPrice - priceLimit, fullPrice + priceLimit],
            },
          },
          order: Sequelize.literal('RANDOM()'),
          limit,
        }),
        Product.findAll({
          include: commonInclude,
          attributes: commonAttributes,
          where: { categoryId },
          order: Sequelize.literal('RANDOM()'),
          limit,
        }),
      ]);

      return {
        recommendedByPrice,
        recommendedByFullPrice,
        recommendedByCategory,
      };
    } catch (error) {
      console.error('Error getting recommended products:', error);
      throw error;
    }
  }

  async getBySearch(query: string, count: number): Promise<Product[]> {
    try {
      const keywords = query.split(' ').map((keyword) => keyword.toLowerCase());
      const nameConditions = keywords.map((keyword) => ({
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      }));

      return await Product.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'year', 'categoryId', 'colorId'],
        },
        where: {
          [Op.or]: [
            { [Op.and]: nameConditions },
            Sequelize.json({ name: { [Op.iLike]: `%${query}%` } }),
          ],
        },
        order: [['name', 'ASC']],
        limit: count,
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(
    offset: number,
    limit: number,
    sortBy: string | undefined,
    category: string,
  ) {
    try {
      const currentCategory = await Category.findOne({
        where: { title: category },
      });

      if (!currentCategory) {
        return null;
      }

      const sortingOrder = generateSortingOrder(sortBy);

      return await Product.findAndCountAll({
        offset,
        limit,
        where: { categoryId: currentCategory.id },
        order: sortingOrder,
        attributes: {
          exclude: ['createdAt', 'year', 'categoryId', 'colorId'],
        },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
      });
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  }

  async getByDeviceId(deviceId: string): Promise<FullProductData | null> {
    try {
      const product = await Product.findOne({
        where: { detailId: deviceId },
        include: [
          {
            model: Detail,
            as: 'detail',
            attributes: { exclude: ['createdAt', 'id'] },
            include: [
              {
                model: Namespace,
                as: 'namespace',
                attributes: ['title'],
              },
            ],
          },
          {
            model: Color,
            as: 'color',
            attributes: ['title'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
        attributes: { exclude: ['createdAt', 'year', 'categoryId'] },
      });

      if (!product?.dataValues) {
        return null;
      }

      const { colorId, detail } = product.dataValues;
      const { namespaceId } = detail.dataValues;

      const [imagesColor, colors, capacities, descriptions] = await Promise.all(
        [
          ImagesColor.findAll({
            where: { namespaceId, colorId },
            attributes: ['imagePath'],
          }),
          ImagesColor.findAll({
            attributes: ['colorId'],
            include: [
              {
                model: Color,
                as: 'color',
                attributes: ['title'],
              },
            ],
            where: { namespaceId },
            group: ['colorId', 'color.id'],
          }),
          Capacity.findAll({
            include: [
              {
                model: NamespaceCapacity,
                as: 'namespaceCapacities',
                where: { namespaceId },
                attributes: [],
              },
            ],
            attributes: ['capacity'],
          }),
          Description.findAll({
            where: { namespaceId },
            attributes: ['title', 'text'],
          }),
        ],
      );

      return { product, imagesColor, capacities, descriptions, colors };
    } catch (error) {
      console.error('Error getting product by device ID:', error);
      throw error;
    }
  }
}

export const productService = ProductService.getInstance();
