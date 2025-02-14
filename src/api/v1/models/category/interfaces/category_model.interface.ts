import { Model } from 'mongoose';
import { CategoryDocument, CreateCategoryData } from './category_document.interface';
export interface CategoryModel extends Model<CategoryDocument> {
  build(data: CreateCategoryData):CategoryDocument
}