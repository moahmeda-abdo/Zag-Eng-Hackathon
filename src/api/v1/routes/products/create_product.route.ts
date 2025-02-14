import { Router } from "express";
import { CreateProductData } from "../../models/product/interfaces/product_document.interface";
import { Product } from "../../models/product/product.model";
import { Middleware } from "../../../common/types.common";
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { CreateProductValidationSchema } from "./validation/create_product.validation";
import { upload } from "../../../../utils/multer"; 
const router = Router();

const CreateProductController: Middleware = async (req, res) => {
  const data = req.body as RequestData;

  const images = req.files ? (req.files as any[]).map(file => `/uploads/products/${file.filename}`) : [];

  const buildData: CreateProductData = {
    ...data,
    images, 
  };

  const product = Product.build(buildData);
  await product.save();

  res.status(201).json({
    status: 201,
    data: product,
  });
};


router.post(
  "/",
  upload.array('images', 5), 
  JOIValidateRequest(CreateProductValidationSchema),
  CreateProductController
);

export { router as CreateProductRoute };

interface RequestData extends Omit<CreateProductData, "images"> { }
