export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class NotFoundError extends CustomError {
  constructor(message = "لم يتم العثور على هذا البيان") {
    super(message, 404);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
export class ForbiddenError extends CustomError {

  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class InternalServer extends CustomError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

