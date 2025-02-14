import Joi from 'joi';
import { CreateUserData } from "../../../models/user/interfaces/user_document.interface";

export const CreateUserValidationSchema = Joi.object<CreateUserData>({
 
});