import { CustomError } from "./custom-error";
import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export class UnAuthenticatedError extends CustomError {
  serial: string = 'UN_AUTHENTICATED';
  statusCode: number = 401;

  constructor(message: string = 'Un Authenticated Request', arMessage: string = 'طلب غير مصرح به', serial: string = 'UN_AUTHENTICATED',) {
    super(message, arMessage);
    this.serial = serial;
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype)
  }

  serialize(): FORMATTED_ERROR[] {
    return [{ message: this.message, arMessage: this.arMessage, serial: this.serial, status: this.statusCode }]
  }

} 