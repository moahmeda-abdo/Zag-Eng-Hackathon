import mongoose, { Schema } from 'mongoose'
import { CartDocument, CreateCartData } from './interfaces/cart_document.interface';
import { CartModel } from './interfaces/cart_model.interface';
import { CartModelName } from '../../../common/models_names';

const schema = new mongoose.Schema<CartDocument, CartModel>({
  is_deleted: {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
} , { timestamps: true })


schema.statics.build = (data: CreateCartData) => new Cart(data);

export const Cart = mongoose.model<CartDocument, CartModel>(
  CartModelName,
  schema
);