import Joi from 'joi';
import { CreateCartData } from "../../../models/cart/interfaces/cart_document.interface";

export const CreateCartValidationSchema = Joi.object<CreateCartData>({
 
});