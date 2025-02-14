import { Document } from 'mongoose'

export interface Product {
  is_deleted: boolean;  
}

export interface ProductDocument extends Product, Document {}

export type CreateProductData = Omit<Product,'is_deleted'>

export type UpdateProductData = Omit<Product,'is_deleted'>