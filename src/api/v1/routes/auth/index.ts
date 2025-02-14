import { Router } from 'express';
import { LoginRoute } from './login.route';
import { SignupRoute } from './signup.route';

const router = Router();

router.use(LoginRoute);
router.use(SignupRoute);

export {router as AuthRoutes}