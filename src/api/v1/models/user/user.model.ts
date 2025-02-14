import mongoose from 'mongoose'
import { UserDocument, CreateUserData } from './interfaces/user_document.interface';
import { UserModel } from './interfaces/user_model.interface';
import { UserModelName } from '../../../common/models_names';

const schema = new mongoose.Schema<UserDocument, UserModel>({
  is_deleted: {type: Boolean, default: false},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
} , { timestamps: true })


schema.statics.build = (data: CreateUserData) => new User(data);

export const User = mongoose.model<UserDocument, UserModel>(
  UserModelName,
  schema
);