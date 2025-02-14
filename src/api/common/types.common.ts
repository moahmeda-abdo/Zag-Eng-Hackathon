import { ObjectId as ObjId } from "mongoose";

import { NextFunction, Request, Response } from "express";
import { DefaultAddress } from "./schema/address.schema";
export type Object_id = ObjId & {
	equals: (value: string | ObjId) => boolean;
	toHexString: () => string;
};
export type Object_id_or_string = Object_id | string;
export type System_language = "ar" | "en";

export type MultiLanguageField = Record<System_language, string>;

export type IRequest = Request & { user?: any } & { files?: any };
export type Middleware = (
	req: IRequest,
	res: Response,
	next?: NextFunction
) => any;

export type RequestAddressData = Omit<DefaultAddress, "country" | "city"> & {
	country: Object_id_or_string;
	city: Object_id_or_string;
};
