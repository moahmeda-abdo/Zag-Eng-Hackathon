import { Router} from "express";
import { CreateUserData } from "../../models/user/interfaces/user_document.interface";
import { User } from "../../models/user/user.model";
import { Middleware } from "../../../common/types.common";
import { JOIValidateRequest } from "../../../../core/middleware/validation/joi-validate-request.middleware";
import { CreateUserValidationSchema } from "./validation/create_user.validation";
const router = Router();

const CreateUserController: Middleware = async (req, res) => {
  const data = req.body as RequestData;

  const buildData: CreateUserData = {
    ...data,
  }
 
  const user = User.build(buildData);
  await user.save();
  res.status(201).json({
    status: 201,
    data: user,
    message: "user created successfully",
    arMessage : "تم إنشاء المستخدم بنجاح"
  });
};

router.post(
  "/",
  JOIValidateRequest(CreateUserValidationSchema),
  CreateUserController
);

export { router as CreateUserRoute };

interface RequestData extends Omit<CreateUserData, ""> {}
