import Joi from 'joi';
import { CreateOrderData } from "../../../models/order/interfaces/order_document.interface";

export const CreateOrderValidationSchema = Joi.object<CreateOrderData>({
 
});