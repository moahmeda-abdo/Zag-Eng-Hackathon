import { Router } from 'express';
import { CreateUserRoute } from './create_user.route';
import { DeleteUserRoute } from './delete_user.route';
import { GetUsersRoute } from './get_users.route';
import { GetUserDetailsRoute } from './get_user_details.route';
import { UpdateUserRoute } from './update_user.route';
const router = Router();

router.use(CreateUserRoute);
router.use(UpdateUserRoute);
router.use(DeleteUserRoute);
router.use(GetUsersRoute);
router.use(GetUserDetailsRoute);

export {router as UsersRoutes}