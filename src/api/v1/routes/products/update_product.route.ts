import { Router, Request, Response } from "express";
import { Product } from '../../models/product/product.model';
import { UpdateProductData } from "../../models/product/interfaces/product_document.interface";
import { JOIValidateRequest } from '../../../../core/middleware/validation/joi-validate-request.middleware';
import { UpdateProductValidationSchema } from './validation/update_product.validation';
import { Middleware } from "../../../common/types.common";
import { NotFoundError } from '../../../../core/errors/not-found.error';

const router = Router();


const UpdateProductController: Middleware = async (req, res) => {
    const data:RequestBody = req.body;

 
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      {new: true}
    ).select("-is_deleted");

    if (!product || product.is_deleted) throw new NotFoundError("product Not Found With Given Id", "لم يتم العثور علي المنتج");

    res.status(200).json({status: 200, data: (product) , message : "Product Updated Successfully", arMessage : "تم تحديث المنتج بنجاح" } )
}

router.put(
  "/:id",
  JOIValidateRequest(UpdateProductValidationSchema),
  UpdateProductController
);


export {router as UpdateProductRoute}


interface RequestBody extends Omit<UpdateProductData, "">{}