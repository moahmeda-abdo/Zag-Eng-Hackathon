import Joi from 'joi';
import { UpdateUserData } from "../../../models/user/interfaces/user_document.interface";

export const UpdateUserValidationSchema = Joi.object<UpdateUserData>({
 
});
