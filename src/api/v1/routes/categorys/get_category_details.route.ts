
import { Router } from 'express';

import { Category } from '../../models/category/category.model';

import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { NotFoundError } from '../../../../core/errors/not-found.error';
import { Middleware } from "../../../common/types.common";


const router =Router();


const CategoryDetailsController: Middleware = async (req, res) => {
	const id = req.params.id;
	const category = await Category.findOne({ _id: id  , is_deleted: false });
	if (!category || category.is_deleted) throw new NotFoundError("Category Not Found" , "لم يتم العثور علي الفئة");
	res.status(200).json({
		status: 200, 
		data: category,
		message: "Category Found Successfully",
		arMessage : "تم العثور على الفئة بنجاح"
	})
}

router.get(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	CategoryDetailsController,
)

export {router as GetCategoryDetailsRoute}