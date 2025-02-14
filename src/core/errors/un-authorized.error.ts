import { CustomError } from "./custom-error";
import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export class UnAuthorizedError extends CustomError {
	serial: string = "UN_AUTHORIZED";
	statusCode: number = 403;

	constructor(
		message: string = "Un Authorized Request",
		arMessage: string = "طلب غير مصرح به",
		serial: string = "UN_AUTHORIZED",
	) {
		super(message, arMessage);
		this.serial = serial;
		Object.setPrototypeOf(this, UnAuthorizedError.prototype);
	}
	serialize(): FORMATTED_ERROR[] {
		return [{ message: this.message, arMessage: this.arMessage, serial: this.serial, status: this.statusCode }];
	}
}
