import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { Cart } from "../../models/cart/cart.model";
import { NotFoundError } from "../../../../core/errors";
import { Product } from "../../models/product/product.model";

const router = Router();

const RemoveFromCartController: Middleware = async (req, res) => {

    const userId = req.user._id;
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError("Product not found", "منتج غير موجود");
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return;
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (!existingItem) {
        throw new NotFoundError("Product not found in cart", "منتج غير موجود في السلة");
    }
    cart.totalPrice -= product.price * existingItem.quantity;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ status: 200, data: cart, message: "Product removed from cart successfully", arMessage: "تم حذف المنتج من السلة بنجاح" })
};


router.post(
    "/remove-from-cart",
    RemoveFromCartController
)

export { router as RemoveFromCartRoute };