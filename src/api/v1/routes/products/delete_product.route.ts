import { Router } from "express";

import { Product } from "../../models/product/product.model";



import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";

import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { Middleware } from "../../../common/types.common";
import { NotFoundError } from "../../../../core/errors/not-found.error";

const router = Router();

const DeleteProductController:Middleware = async (req, res ) => {
	const id =req.params.id as string; 
	const product = await Product.findByIdAndUpdate(id, {is_deleted:true});
	if (!product) throw new NotFoundError("product Not Found With Given Id");
	res.status(204).end()
}

router.delete(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	DeleteProductController,
);
export {router as DeleteProductRoute}