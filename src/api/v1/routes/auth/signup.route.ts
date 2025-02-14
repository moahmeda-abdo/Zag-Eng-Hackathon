

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

    res.status(200).json({ status: 200, data: user, message: "User Created Successfully", arMessage: "تم إنشاء المستخدم بنجاح", token });

};

router.post(
    "/signup",
    SignupController
);

export { router as LoginRoute };

// const schema = new mongoose.Schema<UserDocument, UserModel>({
//   is_deleted: {type: Boolean, default: false},
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String },
//   role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
//   cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
// } , { timestamps: true })