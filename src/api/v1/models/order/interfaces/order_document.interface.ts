import { Document } from 'mongoose'
import { Object_id_or_string } from '../../../../common/types.common';

export interface OrderItem {
  product: Object_id_or_string
  quantity: number;
  price: number;
}

export interface Order {
  user: Object_id_or_string
  items: OrderItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
  address: string;
  payment_status: 'pending' | 'paid' | 'failed';
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface OrderDocument extends Order, Document { }

export type CreateOrderData = Omit<Order, 'is_deleted'>

export type UpdateOrderData = Omit<Order, 'is_deleted'>