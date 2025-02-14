import Joi from 'joi';
import { UpdateOrderData } from "../../../models/order/interfaces/order_document.interface";

export const UpdateOrderValidationSchema = Joi.object<UpdateOrderData>({
 
});
