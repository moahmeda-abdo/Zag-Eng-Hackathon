import { Router } from "express";
import { CategoriesRoutes } from "./routes/categorys";
import { OrdersRoutes } from "./routes/orders";
import { ProductsRoutes } from "./routes/products";
import { AuthRoutes } from "./routes/auth";
import { CartsRoutes } from "./routes/carts";
import { authenticateToken } from "../../core/middleware/auth/authenticateToken";


const router = Router();

router.use("/auth", AuthRoutes)
router.use(authenticateToken)
router.use("/categories", CategoriesRoutes)
router.use("/orders", OrdersRoutes)
router.use("/products", ProductsRoutes)
router.use("/cart", CartsRoutes)


export { router as API_V1_ROUTES };
