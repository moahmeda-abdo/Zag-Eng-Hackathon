import { Product as ProductInterface , ProductDocument } from "./../../models/product/interfaces/product_document.interface";
import { Object_id } from "../../../common/types.common";
import { Product } from "../../models/product/product.model";
import { NotFoundError } from "../../../../core/errors/not-found.error";
import { UpdateProductData } from "../../models/product/interfaces/product_document.interface";
import { Query, FilterQuery } from "mongoose";

interface HelperOptions<T = ProductDocument | ProductDocument[]> {
	throwCustomErrors?: boolean;
  ignoreDeleted?: boolean;
  builder?: (query: Query<T | null, T>) => Query<T | null, T>;
}

const defaultHelperOptions: HelperOptions = {
	throwCustomErrors: true,
  ignoreDeleted: true,
};

export const ProductHelpers = {
  async findById(
		id: string | Object_id,
		{ throwCustomErrors, ignoreDeleted, builder }: HelperOptions = defaultHelperOptions
	) {
    const query = {_id: id};
    const queryCommand = this.findOne(query, {throwCustomErrors, ignoreDeleted, builder});
		const doc = await queryCommand;
		return doc;
	},
	async findOne(
		query: FilterQuery<Partial<ProductInterface & { _id: Object_id | string }>>,
		{ throwCustomErrors, ignoreDeleted, builder }: HelperOptions = defaultHelperOptions
	) {
    const queryCommand = Product.findOne({is_deleted: false, ...query});
    if (ignoreDeleted) query.is_deleted = false;
		const doc = (await (builder ? builder(queryCommand) : queryCommand)) as ProductDocument | null;
		if (!doc && throwCustomErrors)
			throw new NotFoundError(`product Not Found | Query: ${query}`);
		return doc;
	},
	async findByIdAndUpdate(
		id: string | Object_id,
		data: Omit<UpdateProductData, "">,
		{ throwCustomErrors, ignoreDeleted, builder }: HelperOptions = defaultHelperOptions
	) {
		const update = {...data};
    const query = {_id: id};
    const queryCommand = this.updateOne(query, update, {throwCustomErrors, ignoreDeleted, builder})
		const doc = await queryCommand;
		if (!doc && throwCustomErrors)
			throw new NotFoundError(`product Not Found | id: ${id}`);
    return doc
	},
	async updateOne(
		query:FilterQuery<Partial<ProductInterface & { _id: Object_id | string }>>,
		data: Omit<UpdateProductData, "">,
		{ throwCustomErrors, ignoreDeleted, builder }: HelperOptions = defaultHelperOptions
	) {
    if (ignoreDeleted) query.is_deleted = false
		const update = {
			...data,
		};
    const queryCommand = Product.findOneAndUpdate(query, update, {
			new: true,
		})
		const doc = (await (builder ? builder(queryCommand) : queryCommand)) as ProductDocument | null;
		if (!doc && throwCustomErrors)
			throw new NotFoundError(`product Not Found | Query: ${query}`);
		return doc;
	},
}