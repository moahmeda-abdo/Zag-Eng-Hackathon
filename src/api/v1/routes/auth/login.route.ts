

import { Router } from "express";
import { Middleware } from "../../../common/types.common";
import { BadRequestError } from "../../../../core/errors";
import { User } from "../../models/user/user.model";
import { JWT, Password } from "../../../../core/services";

const router = Router();
const LoginController: Middleware = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Invalid Credentials", "بيانات الدخول غير صحيحة");
    }

    const user = await User.findOne({ email: email, is_deleted: false });

    if (!user) {
        throw new BadRequestError("Invalid Credentials", "بيانات الدخول غير صحيحة");
    }



    const isPasswordMatch = await Password.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new BadRequestError("Invalid Credentials", "بيانات الدخول غير صحيحة");
    }


    const token = await JWT.sign({
        _id: user._id,
        email: user.email
    })
    
    res.status(200).json({ status: 200, data: user, message: "Login Successfully", arMessage: "تم تسجيل الدخول بنجاح", token });

};

router.post(
    "/login",
    LoginController
);

export { router as LoginRoute };

