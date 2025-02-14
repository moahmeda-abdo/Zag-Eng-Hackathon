import { Model } from 'mongoose';
import { ProductDocument, CreateProductData } from './product_document.interface';
export interface ProductModel extends Model<ProductDocument> {
  build(data: CreateProductData):ProductDocument
}