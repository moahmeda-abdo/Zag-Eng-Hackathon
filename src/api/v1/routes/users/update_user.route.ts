import { Router, Request, Response } from "express";

import { User } from '../../models/user/user.model';
import { UpdateUserData } from "../../models/user/interfaces/user_document.interface";




import { JOIValidateRequest } from '../../../../core/middleware/validation/joi-validate-request.middleware';
import { UpdateUserValidationSchema } from './validation/update_user.validation';


import { Middleware } from "../../../common/types.common";
import { NotFoundError } from '../../../../core/errors/not-found.error';

const router = Router();


const UpdateUserController: Middleware = async (req, res) => {
    const data:RequestBody = req.body;

 
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      data,
      {new: true}
    ).select("-is_deleted");

    if (!user || user.is_deleted) throw new NotFoundError("user Not Found With Given Id");

    res.status(200).json({status: 200, data: (user) } )
}

router.put(
  "/:id",
  JOIValidateRequest(UpdateUserValidationSchema),
  UpdateUserController
);


export {router as UpdateUserRoute}


interface RequestBody extends Omit<UpdateUserData, "">{}