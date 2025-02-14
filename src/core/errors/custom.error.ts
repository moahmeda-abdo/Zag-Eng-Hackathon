export const CustomError = (err: any, req: any, res: any, next: any) => {
  const formatedDate = new Date(Date.now()).toLocaleTimeString("en-US", {
    hour: "numeric", // 2-digit
    minute: "numeric", // 2-digit
    second: "numeric", // 2-digit
  });

  res
    .status((err && err.statusCode) || 500)
    .json({ error: err.message || "Internal Server Error" });
  // @ts-ignore
  console.log(`[error] `.red + `${formatedDate.gray}  ${err.message.red}`);
};

export const BadRequest = (err: any, req: any, res: any, next: any) => {
  res.status(400).json({ error: "Bad Request" });
  throw new Error("BadRequest");
};
