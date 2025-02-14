import { CustomError } from "./custom-error";
import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export class BadRequestError extends CustomError {
	statusCode: number = 400;
	serial: string = "BAD_REQUEST";
	constructor(message: string = "Bad Request",arMessage: string = 'طلب غير صالح', serial: string = "BAD_REQUEST", ) {
		super(message, arMessage);
		this.serial = serial;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	serialize(): FORMATTED_ERROR[] {
		return [{ message: this.message, arMessage: this.arMessage, serial: this.serial, status: this.statusCode }];
	}
}
