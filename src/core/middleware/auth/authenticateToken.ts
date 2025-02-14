import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../../errors";
import { Middleware } from "../../../api/common/types.common";
import { JWT } from "../../services";
import { User } from "../../../api/v1/models/user/user.model";
import { JwtPayload } from "jsonwebtoken";

const authenticateToken: Middleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnAuthorizedError("Token not provided.", "الرمز غير موجود");
  }

  const decodedToken = JWT.verify(token) as JwtPayload;
  const user = await User.findOne({ _id: decodedToken._id, is_deleted: false }).select("-password");

  if (!user) throw new UnAuthorizedError("Invalid token.", "الرمز غير صحيح");
  req.user = user

  next!();
};

export { authenticateToken };
