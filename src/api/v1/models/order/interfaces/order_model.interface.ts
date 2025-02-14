import { Model } from 'mongoose';
import { OrderDocument, CreateOrderData } from './order_document.interface';
export interface OrderModel extends Model<OrderDocument> {
  build(data: CreateOrderData):OrderDocument
}