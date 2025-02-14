import { Document } from 'mongoose'
import { Object_id_or_string } from '../../../../common/types.common';

export interface User {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  cart: Object_id_or_string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends User, Document {}

export type CreateUserData = Omit<User,'is_deleted'>

export type UpdateUserData = Omit<User,'is_deleted'>