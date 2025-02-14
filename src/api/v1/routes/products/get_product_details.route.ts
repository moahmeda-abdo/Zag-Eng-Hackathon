
import { Router } from 'express';
import { Product } from '../../models/product/product.model';
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { ObjectIdRouteParamsValidationSchema } from "../../../common/validation/route_params.validation"
import { NotFoundError } from '../../../../core/errors/not-found.error';
import { Middleware } from "../../../common/types.common";


const router = Router();


const ProductDetailsController: Middleware = async (req, res) => {
	const id = req.params.id;
	const product = await Product.findOne({ _id: id, is_deleted: false });
	if (!product || product.is_deleted) throw new NotFoundError("Product Not Found", "لم يتم العثور علي المنتج");
	res.status(200).json({ status: 200, data: product, message: "Product Found Successfully", arMessage: "تم العثور على المنتج بنجاح" })
}

router.get(
	"/:id",
	JOIValidateRequest(ObjectIdRouteParamsValidationSchema, "params"),
	ProductDetailsController,
)

export { router as GetProductDetailsRoute }