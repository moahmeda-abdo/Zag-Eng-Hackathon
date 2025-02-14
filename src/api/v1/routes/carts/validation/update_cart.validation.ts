import Joi from 'joi';
import { UpdateCartData } from "../../../models/cart/interfaces/cart_document.interface";

export const UpdateCartValidationSchema = Joi.object<UpdateCartData>({
 
});
