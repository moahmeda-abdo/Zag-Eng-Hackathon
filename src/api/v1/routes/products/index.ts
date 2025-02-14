import { Router } from 'express';
import { CreateProductRoute } from './create_product.route';
import { DeleteProductRoute } from './delete_product.route';
import { GetProductsRoute } from './get_products.route';
import { GetProductDetailsRoute } from './get_product_details.route';
import { UpdateProductRoute } from './update_product.route';
const router = Router();

router.use(CreateProductRoute);
router.use(UpdateProductRoute);
router.use(DeleteProductRoute);
router.use(GetProductsRoute);
router.use(GetProductDetailsRoute);

export {router as ProductsRoutes}