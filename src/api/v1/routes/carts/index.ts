import { Router } from 'express';
import { GetCartDetailsRoute } from './get_cart_details.route';
import { AddToCartRoute } from './add_to_cart.route';
import { RemoveFromCartRoute } from './remove_from_cart.route';

const router = Router();

router.use(GetCartDetailsRoute);
router.use(AddToCartRoute)
router.use(RemoveFromCartRoute)

export {router as CartsRoutes}