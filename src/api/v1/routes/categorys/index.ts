import { Router } from 'express';
import { CreateCategoryRoute } from './create_category.route';
import { DeleteCategoryRoute } from './delete_category.route';
import { GetCategorysRoute } from './get_categorys.route';
import { GetCategoryDetailsRoute } from './get_category_details.route';
import { UpdateCategoryRoute } from './update_category.route';
const router = Router();

router.use(CreateCategoryRoute);
router.use(UpdateCategoryRoute);
router.use(DeleteCategoryRoute);
router.use(GetCategorysRoute);
router.use(GetCategoryDetailsRoute);

export {router as CategoriesRoutes}