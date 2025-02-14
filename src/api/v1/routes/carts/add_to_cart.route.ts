import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { Cart } from "../../models/cart/cart.model";
import { Product } from "../../models/product/product.model";
import { NotFoundError } from "../../../../core/errors";

const router = Router();

const AddToCartController: Middleware = async (req, res) => {

    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError("Product not found", "منتج غير موجود");
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        const cart = await Cart.create({ user: userId, items: [{ product: productId, quantity }], totalPrice: product.price * quantity });
        return res.status(200).json({ status: 200, data: cart, message: "Product added to cart successfully", arMessage: "تمت اضافة المنتج الى السلة بنجاح" })
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
        cart.totalPrice += product.price * quantity;
    }

    await cart.save();

    res.status(200).json({ status: 200, data: cart, message: "Product added to cart successfully", arMessage: "تمت اضافة المنتج الى السلة بنجاح" })
};


router.post(
    "/add-to-cart",
    AddToCartController
)

export { router as AddToCartRoute };