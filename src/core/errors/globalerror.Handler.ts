function errorHandler(err: any, req: any, res: any, next: any) {
  console.error({
    locator: "errorHandler",
    message: err.message,
    stack: err.stack,
  });
  res.status(500).send({ error: "Internal server error" });
}

module.exports = errorHandler;