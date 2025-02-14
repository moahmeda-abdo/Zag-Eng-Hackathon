import { Document } from 'mongoose'
import { Object_id_or_string } from '../../../../common/types.common';

export interface Category {
  name: string;
  description?: string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface CategoryDocument extends Category, Document {
  _id: Object_id_or_string;

}

export type CreateCategoryData = Omit<Category, 'is_deleted'>

export type UpdateCategoryData = Omit<Category, 'is_deleted'>