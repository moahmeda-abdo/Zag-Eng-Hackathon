import { CustomError } from "./custom-error";
import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export class OutOfStockError extends CustomError {
    serial: string = "OUT_OF_STOCK";
    statusCode: number = 400;

    constructor(message: string , arMessage: string) {
        super(message , arMessage);
        Object.setPrototypeOf(this, OutOfStockError.prototype);
    }

    serialize(): FORMATTED_ERROR[] {
        return [
            {
                message: this.message,
                arMessage: this.arMessage,
                serial: this.serial,
                status: this.statusCode,
            },
        ];
    }
}