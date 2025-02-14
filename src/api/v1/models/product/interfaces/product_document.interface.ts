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
}

export interface ProductDocument extends Product, Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Object_id_or_string
  images: string[];
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductData = Omit<Product,'is_deleted'>

export type UpdateProductData = Omit<Product,'is_deleted'>