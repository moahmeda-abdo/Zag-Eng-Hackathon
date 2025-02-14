import Joi from 'joi';
import { ObjectIdValidation } from './object_id.validation';
export function DefaultAddressValidationSchema () {
    const schema = {
        country: ObjectIdValidation().required(),
        city: ObjectIdValidation().required(),
        neighborhood: Joi.string().required(),
        street_name: Joi.string(),
        building_no: Joi.string(),
        postal_code: Joi.string(),
        details: Joi.string(),
        location: Joi.object({
            type: Joi.string().valid("Point").default("Point"),
            coordinates: Joi.array().items(Joi.number()).min(2).max(2).required()
        })
    }

    return {
        schema,
        validation: Joi.object<typeof schema>()
    }
}