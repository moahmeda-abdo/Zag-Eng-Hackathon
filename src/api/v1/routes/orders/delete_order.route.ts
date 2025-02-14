import { Router } from "express";

import { Order } from "../../models/order/order.model";



import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";

import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { Middleware } from "../../../common/types.common";
import { NotFoundError } from "../../../../core/errors/not-found.error";

const router = Router();

const DeleteOrderController:Middleware = async (req, res ) => {
	const id =req.params.id as string; 
	const order = await Order.findByIdAndUpdate(id, {is_deleted:true});
	if (!order) throw new NotFoundError("order Not Found With Given Id" , "لم يتم العثور علي الطلب");
	res.status(204).end()
}

router.delete(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	DeleteOrderController,
);
export {router as DeleteOrderRoute}