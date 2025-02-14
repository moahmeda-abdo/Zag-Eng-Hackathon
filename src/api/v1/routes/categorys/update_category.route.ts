import { Router, Request, Response } from "express";

import { Category } from '../../models/category/category.model';
import { UpdateCategoryData } from "../../models/category/interfaces/category_document.interface";




import { JOIValidateRequest } from '../../../../core/middleware/validation/joi-validate-request.middleware';
import { UpdateCategoryValidationSchema } from './validation/update_category.validation';


import { Middleware } from "../../../common/types.common";
import { NotFoundError } from '../../../../core/errors/not-found.error';

const router = Router();


const UpdateCategoryController: Middleware = async (req, res) => {
    const data:RequestBody = req.body;

 
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      data,
      {new: true}
    ).select("-is_deleted");

    if (!category || category.is_deleted) throw new NotFoundError("category Not Found With Given Id" , "لم يتم العثور علي الفئة");

    res.status(200).json({status: 200, data: (category) } )
}

router.put(
  "/:id",
  JOIValidateRequest(UpdateCategoryValidationSchema),
  UpdateCategoryController
);


export {router as UpdateCategoryRoute}


interface RequestBody extends Omit<UpdateCategoryData, "">{}