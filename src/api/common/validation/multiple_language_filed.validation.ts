import Joi, { StringSchema } from "joi";
import { System_language } from "../types.common";

export function MultipleLanguageFiledValidationSchema() {
  const languages: System_language[] = ["en", "ar"];

  const schema: Record<string, StringSchema> = {};

  for (let lang of languages) {
    schema[lang] = Joi.string().required().not().empty();
  }

  return {
    schema,
    validation: Joi.object<typeof schema>(schema),
  };
}
