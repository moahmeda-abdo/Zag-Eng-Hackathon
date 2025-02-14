import mongoose from 'mongoose'
import { CategoryDocument, CreateCategoryData } from './interfaces/category_document.interface';
import { CategoryModel } from './interfaces/category_model.interface';
import { CategoryModelName } from '../../../common/models_names';

const schema = new mongoose.Schema<CategoryDocument, CategoryModel>({
  is_deleted: { type: Boolean, default: false },
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true })


schema.statics.build = (data: CreateCategoryData) => new Category(data);

export const Category = mongoose.model<CategoryDocument, CategoryModel>(
  CategoryModelName,
  schema
);