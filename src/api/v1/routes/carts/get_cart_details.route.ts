
import { Router } from 'express';

import { Cart } from '../../models/cart/cart.model';

import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { NotFoundError } from '../../../../core/errors/not-found.error';
import { Middleware } from "../../../common/types.common";


const router =Router();


const CartDetailsController: Middleware = async (req, res) => {
	const id = req.params.id;
	const cart = await Cart.findOne({ _id: id  , is_deleted: false });
	if (!cart || cart.is_deleted) throw new NotFoundError("Cart Not Found");
	res.status(200).json({status: 200, data: cart })
}

router.get(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	CartDetailsController,
)

export {router as GetCartDetailsRoute}