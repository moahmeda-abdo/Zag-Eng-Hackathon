import { Document } from 'mongoose'
import { Object_id_or_string } from '../../../../common/types.common';

export interface CartItem {
  product: Object_id_or_string;
  quantity: number;
}


export interface Cart {
  user: Object_id_or_string; 
  items: CartItem[];
  totalPrice: number;
  is_deleted: boolean;  
}

export interface CartDocument extends Cart, Document {}

export type CreateCartData = Omit<Cart,'is_deleted'>

export type UpdateCartData = Omit<Cart,'is_deleted'>