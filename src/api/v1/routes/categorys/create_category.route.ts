import { Router} from "express";
import { CreateCategoryData } from "../../models/category/interfaces/category_document.interface";
import { Category } from "../../models/category/category.model";
import { Middleware } from "../../../common/types.common";
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { CreateCategoryValidationSchema } from "./validation/create_category.validation";
const router = Router();

const CreateCategoryController: Middleware = async (req, res) => {
  const data = req.body as RequestData;

  const buildData: CreateCategoryData = {
    ...data,
  }
 
  const category = Category.build(buildData);
  await category.save();
  res.status(201).json({
    status: 201,
    data: category,
  });
};

router.post(
  "/",
  JOIValidateRequest(CreateCategoryValidationSchema),
  CreateCategoryController
);

export { router as CreateCategoryRoute };

interface RequestData extends Omit<CreateCategoryData, ""> {}
