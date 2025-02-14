
import { Router } from 'express';
import { Order } from '../../models/order/order.model';
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { ObjectIdRouteParamsValidationSchema } from "../../../common/validation/route_params.validation"
import { Middleware } from "../../../common/types.common";


const router = Router();

const MyOrders: Middleware = async (req, res) => {
    
    const userId = req.user._id;
    const orders = await Order.find({ user: userId, is_deleted: false });

    res.status(200).json({
        status: 200,
        data: orders,
        total: orders.length,
        message: "Orders Found Successfully",
        arMessage: "تم العثور على الطلبات بنجاح"
    })
}

router.get(
    "/my-orders",
    JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
    MyOrders,
)

export { router as GetMyOrdersRoute };