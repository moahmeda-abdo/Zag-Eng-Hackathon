import { FORMATTED_ERROR } from "./interfaces/formatted_error";

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serial: string;
  protected arMessage?: string;
  constructor(message?: string , arMessage?: string) {
    super(message)
    this.arMessage = arMessage
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serialize(): FORMATTED_ERROR[]
}