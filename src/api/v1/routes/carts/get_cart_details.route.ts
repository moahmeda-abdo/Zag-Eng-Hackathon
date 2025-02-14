
import { Router } from 'express';
import { Cart } from '../../models/cart/cart.model';
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { ObjectIdRouteParamsValidationSchema } from "../../../common/validation/route_params.validation"
import { Middleware } from "../../../common/types.common";


const router = Router();


const CartDetailsController: Middleware = async (req, res) => {
	const userId = req.user._id;
	const cart = await Cart.findOne({ user: userId, is_deleted: false });

	if (!cart || cart.is_deleted) {
		const cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
		return res.status(200).json({ status: 200, data: cart })
	}
	
	res.status(200).json({ status: 200, data: cart , message : "Cart Found Successfully", arMessage : "تم العثور على السلة بنجاح" })
}

router.get(
	"/my-cart",
	JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	CartDetailsController,
)

export { router as GetCartDetailsRoute }