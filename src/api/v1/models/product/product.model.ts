import mongoose from 'mongoose'
import { ProductDocument, CreateProductData } from './interfaces/product_document.interface';
import { ProductModel } from './interfaces/product_model.interface';
import { ProductModelName } from '../../../common/models_names';

const schema = new mongoose.Schema<ProductDocument, ProductModel>({
  is_deleted: {type: Boolean, default: false},
} , { timestamps: true })


schema.statics.build = (data: CreateProductData) => new Product(data);

export const Product = mongoose.model<ProductDocument, ProductModel>(
  ProductModelName,
  schema
);