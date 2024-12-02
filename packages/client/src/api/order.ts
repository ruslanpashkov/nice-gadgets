import { client } from '../helpers/fetchClient';

interface OrderProduct {
  id: number;
  quantity: number;
}

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  products: OrderProduct[];
  totalPrice: number;
  totalQuantity: number;
}

interface OrderResponse extends OrderData {
  id: number;
  createdAt: string;
}

export const createOrder = async (
  orderData: OrderData,
): Promise<OrderResponse> => {
  const response = await client.post<OrderResponse>('/orders', orderData);
  return response;
};

export const getOrderById = async (id: number): Promise<OrderResponse> => {
  const response = await client.get<OrderResponse>(`/orders/${id}`);
  return response;
};
