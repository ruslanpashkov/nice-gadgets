'use strict';

import { Order } from '../models/Order.model.js';
import { Product } from '../models/Product.model.js';

interface OrderData {
  name: string;
  phone: string;
  address: string;
  products: Array<{
    id: number;
    quantity: number;
  }>;
  totalPrice: number;
  totalQuantity: number;
}

class OrderService {
  private static instance: OrderService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }

    return OrderService.instance;
  }

  async createOrder(orderData: OrderData): Promise<Order> {
    try {
      // Get product details for each ordered item
      const productsDetails = await Promise.all(
        orderData.products.map(async (product) => {
          const productDetails = await Product.findByPk(product.id);
          return {
            id: product.id,
            quantity: product.quantity,
            name: productDetails?.name,
            price: productDetails?.price,
          };
        }),
      );

      return await Order.create({
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        totalPrice: orderData.totalPrice,
        totalQuantity: orderData.totalQuantity,
        items: productsDetails,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrder(orderId: number): Promise<Order | null> {
    try {
      return await Order.findByPk(orderId);
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  }
}

export const orderService = OrderService.getInstance();
