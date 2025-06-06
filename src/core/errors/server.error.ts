import { CustomError } from "./custom-error";
import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export class ServerError extends CustomError {
	serial: string = "SERVER_ERROR";
	statusCode: number = 500;

	constructor(message: string = "Server Error", arMessage: string = 'خطأ في الخادم', serial: string = "SERVER_ERROR",) {
		super(message, arMessage);
		this.serial = serial;
		Object.setPrototypeOf(this, ServerError.prototype);
	}
	serialize(): FORMATTED_ERROR[] {
		return [{ message: this.message, arMessage: this.arMessage, serial: this.serial, status: this.statusCode }];
	}
}
