'use strict';

import { orderService } from '../services/order.service.js';
import { Controller } from '../types.js';

class OrderController {
  private static instance: OrderController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): OrderController {
    if (!OrderController.instance) {
      OrderController.instance = new OrderController();
    }

    return OrderController.instance;
  }

  createOrder: Controller = async (req, res) => {
    try {
      const orderData = req.body;

      if (!orderData || !orderData.products?.length) {
        return res.status(400).json({ message: 'Invalid order data' });
      }

      const order = await orderService.createOrder(orderData);

      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to create order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getOrder: Controller = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Order ID is required' });
      }

      const order = await orderService.getOrder(Number(id));

      if (!order) {
        return res
          .status(404)
          .json({ message: `Order with ID '${id}' not found` });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch order',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

export const orderController = OrderController.getInstance();
