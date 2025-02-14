import { Router } from "express";

import { Category } from "../../models/category/category.model";



import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";

import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { Middleware } from "../../../common/types.common";
import { NotFoundError } from "../../../../core/errors/not-found.error";

const router = Router();

const DeleteCategoryController:Middleware = async (req, res ) => {
	const id =req.params.id as string; 
	const category = await Category.findByIdAndUpdate(id, {is_deleted:true});
	if (!category) throw new NotFoundError("category Not Found With Given Id");
	res.status(204).end()
}

router.delete(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	DeleteCategoryController,
);
export {router as DeleteCategoryRoute}