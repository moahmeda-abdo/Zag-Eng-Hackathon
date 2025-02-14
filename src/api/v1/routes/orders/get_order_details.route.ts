
import { Router } from 'express';

import { Order } from '../../models/order/order.model';

import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { NotFoundError } from '../../../../core/errors/not-found.error';
import { Middleware } from "../../../common/types.common";


const router =Router();


const OrderDetailsController: Middleware = async (req, res) => {
	const id = req.params.id;
	const order = await Order.findOne({ _id: id  , is_deleted: false });
	if (!order || order.is_deleted) throw new NotFoundError("Order Not Found", "لم يتم العثور علي الطلب");
	res.status(200).json({status: 200, data: order })
}

router.get(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	OrderDetailsController,
)

export {router as GetOrderDetailsRoute}