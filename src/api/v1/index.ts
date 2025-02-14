import { Router } from "express";
import { CategoriesRoutes } from "./routes/categorys";
import { OrdersRoutes } from "./routes/orders";
import { ProductsRoutes } from "./routes/products";


const router = Router();

router.use("/categories", CategoriesRoutes)
router.use("/orders", OrdersRoutes)
router.use("/products", ProductsRoutes)


export { router as API_V1_ROUTES };
