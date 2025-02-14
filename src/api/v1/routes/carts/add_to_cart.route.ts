import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { Cart } from "../../models/cart/cart.model";

const router = Router();

const AddToCartController: Middleware = async (req, res) => {

    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return await Cart.create({ user: userId, items: [{ product: productId, quantity }], totalPrice: 0 });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ status: 200, data: cart, message: "Product added to cart successfully", arMessage: "تمت اضافة المنتج الى السلة بنجاح" })
};


router.post(
    "/add-to-cart",
    AddToCartController
)

export { router as AddToCartRoute };