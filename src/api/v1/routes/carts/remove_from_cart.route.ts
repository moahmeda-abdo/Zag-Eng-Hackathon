import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { Cart } from "../../models/cart/cart.model";

const router = Router();

const RemoveFromCartController: Middleware = async (req, res) => {

    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return;

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ status: 200, data: cart, message: "Product removed from cart successfully", arMessage:"تم حذف المنتج من السلة بنجاح" })
};


router.post(
    "/remove-from-cart",
    RemoveFromCartController
)

export { router as RemoveFromCartRoute };