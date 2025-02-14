import { Router, Request } from "express";
import { Product } from "../../models/product/product.model";
import { Middleware } from "../../../common/types.common";



const router = Router();

const GetProductController: Middleware = async (req, res) => {
	const limit = +(req.query.limit ?? "20");
	const skip = +(req.query.skip ?? "0");
	const { order, sortBy } = req.query as Record<string, any>;

	const sort: Record<string, any> = {};
	sort[sortBy ?? "createdAt"] = order ?? "desc";

	const query = buildQuery(req);

	const totalDocumentsCount = await Product.countDocuments(query)

	res.status(200).json({
		status: 200,
		data: await Product.find(query).sort(sort).limit(limit).skip(skip).select("-is_deleted"),
		total: totalDocumentsCount,
		Message: "Products Found Successfully",
		arMessage: "تم العثور على المنتجات بنجاح"
	});
};
router.get(
	"/",
	GetProductController,
);

export { router as GetProductsRoute };

function buildQuery(req: Request) {
	const { category, min_price, max_price, name, brand } = req.query as Record<string, any>;
	const query: Record<string, any> = {
		is_deleted: false,
		...(category && { category }),
		...(min_price && { price: { $gte: min_price } }),
		...(max_price && { price: { $lte: max_price } }),
		...(name && { name: { $regex: name, $options: "i" } }),
		...(brand && { brand: { $regex: brand, $options: "i" } }),
	}

	return query;
}
