import { Router } from "express";
import { CreateOrderData } from "../../models/order/interfaces/order_document.interface";
import { Order } from "../../models/order/order.model";
import { Middleware } from "../../../common/types.common";
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { CreateOrderValidationSchema } from "./validation/create_order.validation";
import { Product } from "../../models/product/product.model";
import { NotFoundError } from "../../../../core/errors";
const router = Router();

const CreateOrderController: Middleware = async (req, res) => {
  const data = req.body as RequestData;

  const buildData: CreateOrderData = {
    ...data,
    user: req.user._id,
  }

  buildData.items.forEach(async (item) => {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    product.stock -= item.quantity;
    await product.save();
  })
  const order = Order.build(buildData);
  await order.save();
  
  res.status(201).json({
    status: 201,
    data: order,
    message: "order created successfully",
    arMessage: "تم إنشاء الطلب بنجاح"
  });
};

router.post(
  "/",
  JOIValidateRequest(CreateOrderValidationSchema),
  CreateOrderController
);

export { router as CreateOrderRoute };

interface RequestData extends Omit<CreateOrderData, ""> { }
