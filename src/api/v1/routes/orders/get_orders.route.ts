import { Router, Request } from "express";

import { Order } from "../../models/order/order.model";
const router = Router();



import { Middleware } from "../../../common/types.common";

const GetOrderController:Middleware = async (req, res) => {
  const limit = +(req.query.limit ?? "20");
  const skip = +(req.query.skip ?? "0");
  const {order, sortBy} = req.query as Record<string, any>;
  
	const sort: Record<string, any> = {};
	sort[sortBy ?? "createdAt"]=order ?? "desc";

	const query = buildQuery(req);

	const totalDocumentsCount = await Order.countDocuments(query)
	
  res.status(200).json({
    status: 200,
    data: await Order.find(query).sort(sort).limit(limit).skip(skip).select("-is_deleted"),
		total: totalDocumentsCount,
		Message: "Orders Found Successfully",
		arMessage: "تم العثور على الطلبات بنجاح"
  });
};
router.get(
	"/",
	GetOrderController,
);

export { router as GetOrdersRoute };

function buildQuery(req: Request) {
	const {} = req.query as Record<string, any>;
	const query: Record<string, any> = {
    is_deleted: false
  }

	return query;
}
