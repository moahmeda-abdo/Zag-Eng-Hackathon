import { Router } from "express";

import { User } from "../../models/user/user.model";



import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";

import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { Middleware } from "../../../common/types.common";
import { NotFoundError } from "../../../../core/errors/not-found.error";

const router = Router();

const DeleteUserController:Middleware = async (req, res ) => {
	const id =req.params.id as string; 
	const user = await User.findByIdAndUpdate(id, {is_deleted:true});
	if (!user) throw new NotFoundError("user Not Found With Given Id");
	res.status(204).end()
}

router.delete(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	DeleteUserController,
);
export {router as DeleteUserRoute}