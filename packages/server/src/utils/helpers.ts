'use strict';

import { Request } from 'express';
import { OrderItem } from 'sequelize';
import { Category } from '../models/Category.model.js';
import { Product } from '../models/Product.model.js';
import { FullProduct } from '../types.js';

export const getUniqueItems = <T, K extends keyof T>(
  array: T[],
  key: K,
): T[] => {
  const uniques = new Set<T[K]>();

  return array.filter((item) => {
    const value = item[key];
    if (!uniques.has(value)) {
      uniques.add(value);
      return true;
    }
    return false;
  });
};

export const getPaginationInfo = (req: Request) => {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit || 16)));

  const offset = limit * (page - 1);

  return { initialLimit: limit, offset };
};

export enum SortType {
  HighestPrice = 'highestPrice',
  LowestPrice = 'lowestPrice',
}

export const generateSortingOrder = (
  sortBy: string | string[] | undefined,
): OrderItem[] => {
  switch (sortBy) {
    case SortType.HighestPrice:
      return [
        ['fullPrice', 'DESC'],
        ['id', 'ASC'],
      ];
    case SortType.LowestPrice:
      return [
        ['fullPrice', 'ASC'],
        ['id', 'ASC'],
      ];
    default:
      return [
        ['year', 'DESC'],
        ['id', 'ASC'],
      ];
  }
};

export const formatSingleProduct = (fullProduct: FullProduct) => {
  const { product, imagesColor, capacities, descriptions, colors } =
    fullProduct;

  if (!product) {
    throw new Error('Product data is missing');
  }

  const productJSON = product.toJSON();

  return {
    id: productJSON.detailId,
    resolution: productJSON.detail?.resolution,
    processor: productJSON.detail?.processor,
    camera: productJSON.detail?.camera,
    zoom: productJSON.detail?.zoom,
    cell: productJSON.detail?.cell,
    namespace: productJSON.detail?.namespace?.title,
    name: productJSON.name,
    itemId: productJSON.id,
    fullPrice: productJSON.fullPrice,
    price: productJSON.price,
    ram: productJSON.ram,
    screen: productJSON.screen,
    capacity: productJSON.capacity,
    color: productJSON.color?.title,
    category: productJSON.category?.title,
    images: imagesColor.map((img) => img.toJSON().imagePath),
    capacityAvailable: capacities.map((cap) => cap.toJSON().capacity),
    colorsAvailable: colors.map((col) => col.toJSON().color.title),
    descriptions,
  };
};

export const formatMultipleProducts = (products: Product[]) => {
  return products.map((product) => {
    const { category, detailId, ...productData } = product.toJSON();

    return {
      ...productData,
      itemId: detailId,
      category: category?.title || 'Unknown',
    };
  });
};

export const checkValidCategory = async (
  category: string,
): Promise<boolean> => {
  const allCategories = await Category.findAll();
  const categoryTitles = allCategories.map((cat) => cat.toJSON().title);

  return categoryTitles.includes(category);
};
