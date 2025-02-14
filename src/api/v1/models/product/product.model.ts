import mongoose from 'mongoose'
import { ProductDocument, CreateProductData } from './interfaces/product_document.interface';
import { ProductModel } from './interfaces/product_model.interface';
import { ProductModelName } from '../../../common/models_names';

const schema = new mongoose.Schema<ProductDocument, ProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }], 
  is_deleted: { type: Boolean, default: false },
}, { timestamps: true })


schema.statics.build = (data: CreateProductData) => new Product(data);

export const Product = mongoose.model<ProductDocument, ProductModel>(
  ProductModelName,
  schema
);