import Joi from 'joi';
import { CreateCategoryData } from "../../../models/category/interfaces/category_document.interface";

export const CreateCategoryValidationSchema = Joi.object<CreateCategoryData>({
 
});