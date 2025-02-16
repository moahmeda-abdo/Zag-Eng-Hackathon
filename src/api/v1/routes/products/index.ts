import { Router } from 'express';
import { CreateProductRoute } from './create_product.route';
import { DeleteProductRoute } from './delete_product.route';
import { GetProductsRoute } from './get_products.route';
import { GetProductDetailsRoute } from './get_product_details.route';
import { UpdateProductRoute } from './update_product.route';
import { authenticateToken } from '../../../../core/middleware/auth/authenticateToken';
import { Middleware } from '../../../common/types.common';
const router = Router();

router.use(GetProductsRoute);
router.use(GetProductDetailsRoute);
router.use(authenticateToken as Middleware, CreateProductRoute);
router.use(authenticateToken as Middleware, UpdateProductRoute);
router.use(authenticateToken as Middleware, DeleteProductRoute);

export { router as ProductsRoutes }