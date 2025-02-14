import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { BadRequestError } from "../../../../core/errors";
import { User } from "../../models/user/user.model";
import { JWT, Password } from "../../../../core/services";

const router = Router();
const SignupController: Middleware = async (req, res) => {

    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone) {
        throw new BadRequestError("Invalid Credentials", "بيانات الدخول غير صحيحة");
    }
    const existingUser = await User.findOne({ email: email, is_deleted: false });

    if (existingUser) {
        throw new BadRequestError("User Already Exists", "المستخدم موجود بالفعل");
    }
    const hashedPassword = await Password.hash(password);

    const user = new User({
        email,
        password: hashedPassword,
        name,
        phone
    })

    const token = await JWT.sign({
        _id: user._id,
        email: user.email
    })

    await user.save();

    const userResponse = user.toObject() as { password?: string };
    userResponse.password = undefined

    res.status(200).json({ status: 200, data: userResponse, message: "User Created Successfully", arMessage: "تم إنشاء المستخدم بنجاح", token });

};

router.post(
    "/signup",
    SignupController
);

export { router as SignupRoute };

