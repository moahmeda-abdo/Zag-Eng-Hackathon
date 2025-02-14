import Joi from 'joi';
import { CreateProductData } from "../../../models/product/interfaces/product_document.interface";

export const CreateProductValidationSchema = Joi.object<CreateProductData>({
 
});