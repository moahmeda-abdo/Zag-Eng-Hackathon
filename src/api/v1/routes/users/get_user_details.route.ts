
import { Router } from 'express';

import { User } from '../../models/user/user.model';

import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import {ObjectIdRouteParamsValidationSchema} from "../../../common/validation/route_params.validation"

import { NotFoundError } from '../../../../core/errors/not-found.error';
import { Middleware } from "../../../common/types.common";


const router =Router();


const UserDetailsController: Middleware = async (req, res) => {
	const id = req.params.id;
	const user = await User.findOne({ _id: id  , is_deleted: false });
	if (!user || user.is_deleted) throw new NotFoundError("User Not Found" , "لم يتم العثور علي المستخدم");
	res.status(200).json({status: 200, data: user })
}

router.get(
	"/:id",
  JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	UserDetailsController,
)

export {router as GetUserDetailsRoute}