import { Router, Request, Response } from "express";

import { Order } from '../../models/order/order.model';
import { UpdateOrderData } from "../../models/order/interfaces/order_document.interface";




import { JOIValidateRequest } from '../../../../core/middleware/validation/joi-validate-request.middleware';
import { UpdateOrderValidationSchema } from './validation/update_order.validation';


import { Middleware } from "../../../common/types.common";
import { NotFoundError } from '../../../../core/errors/not-found.error';

const router = Router();


const UpdateOrderController: Middleware = async (req, res) => {
    const data:RequestBody = req.body;

 
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      data,
      {new: true}
    ).select("-is_deleted");

    if (!order || order.is_deleted) throw new NotFoundError("order Not Found With Given Id", "لم يتم العثور علي الطلب");

    res.status(200).json({status: 200, data: (order) , message : "Order Updated Successfully", arMessage : "تم تحديث الطلب بنجاح" } )
}

router.put(
  "/:id",
  JOIValidateRequest(UpdateOrderValidationSchema),
  UpdateOrderController
);


export {router as UpdateOrderRoute}


interface RequestBody extends Omit<UpdateOrderData, "">{}