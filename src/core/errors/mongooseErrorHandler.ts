import { resFormat } from "../helpers/resForm";

export const  mongooseErrorHandler = (err   :any, req  :any, res :any, next :any) => {
  if (err.name === "ValidationError") {
    // Handle validation errors
    const errors = Object.values(err.errors).map((error : any) => error.message);
    resFormat({
      error: "خطأ في البيانات",
      statusCode: 400,
      message: "خطأ في البيانات",
      errors,
    }, res);
  } else if (err.name === "MongoError" && err.code === 11000) {
    // Handle duplicate key errors
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    resFormat({
      error: "قيمة مكررة",
      statusCode: 400,
      message: `${field} '${value}' مستخدمة مسبقاً`,
    }, res);
  } else {
    // Handle all other errors
    next(err);
  }
};