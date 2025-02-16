import { Router } from 'express';
import { CreateCategoryRoute } from './create_category.route';
import { DeleteCategoryRoute } from './delete_category.route';
import { GetCategorysRoute } from './get_categorys.route';
import { GetCategoryDetailsRoute } from './get_category_details.route';
import { UpdateCategoryRoute } from './update_category.route';
import { authenticateToken } from '../../../../core/middleware/auth/authenticateToken';
import { Middleware } from '../../../common/types.common';
const router = Router();

router.use(authenticateToken as Middleware, CreateCategoryRoute);
router.use(authenticateToken as Middleware, UpdateCategoryRoute);
router.use(authenticateToken as Middleware, DeleteCategoryRoute);
router.use(GetCategorysRoute);
router.use(GetCategoryDetailsRoute);

export { router as CategoriesRoutes }