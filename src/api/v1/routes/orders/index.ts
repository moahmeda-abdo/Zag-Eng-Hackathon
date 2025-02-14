import { Router } from 'express';
import { CreateOrderRoute } from './create_order.route';
import { DeleteOrderRoute } from './delete_order.route';
import { GetOrdersRoute } from './get_orders.route';
import { GetOrderDetailsRoute } from './get_order_details.route';
import { UpdateOrderRoute } from './update_order.route';
import { GetMyOrdersRoute } from './my_orders.route';
const router = Router();

router.use(GetMyOrdersRoute);
router.use(CreateOrderRoute);
router.use(UpdateOrderRoute);
router.use(DeleteOrderRoute);
router.use(GetOrdersRoute);
router.use(GetOrderDetailsRoute);

export {router as OrdersRoutes}