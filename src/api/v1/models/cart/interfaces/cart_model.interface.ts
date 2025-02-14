import { Model } from 'mongoose';
import { CartDocument, CreateCartData } from './cart_document.interface';
export interface CartModel extends Model<CartDocument> {
  build(data: CreateCartData):CartDocument
}