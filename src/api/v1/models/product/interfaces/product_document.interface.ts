import { Document } from 'mongoose'
import { Object_id_or_string } from '../../../../common/types.common';

export interface Product {
  is_deleted: boolean;  
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Object_id_or_string
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  brand : string
}

export interface ProductDocument extends Product, Document {

}

export type CreateProductData = Omit<Product,'is_deleted'>

export type UpdateProductData = Omit<Product,'is_deleted'>