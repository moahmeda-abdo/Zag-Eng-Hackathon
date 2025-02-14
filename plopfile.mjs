export default function (
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	plop.setGenerator("cm", {
		description: "application Model, Route and controller",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "module name",
			},
			{
				type: "input",
				name: "authRequired",
				message: "Require User To Be Authenticated",
				default: false,
			},
			{
				type: "input",
				name: "userType",
				message: "Require User To Have A Type",
				default: "",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/api/v1/models/{{snakeCase name}}/{{snakeCase name}}.model.ts",
				templateFile: "plop_templates/models/model.template.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/models/{{snakeCase name}}/interfaces/{{snakeCase name}}_document.interface.ts",
				templateFile:
					"plop_templates/models/model_db_document_interface.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/models/{{snakeCase name}}/interfaces/{{snakeCase name}}_model.interface.ts",
				templateFile: "plop_templates/models/model_db_model_interface.temp.hbs",
				skipIfExists: true,
			},

			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/create_{{snakeCase name}}.route.ts",
				templateFile: "plop_templates/routes/create_route.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/update_{{snakeCase name}}.route.ts",
				templateFile: "plop_templates/routes/update_route.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/get_{{snakeCase name}}_details.route.ts",
				templateFile: "plop_templates/routes/get_details_route.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/get_{{snakeCase name}}s.route.ts",
				templateFile: "plop_templates/routes/get_all_route.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/delete_{{snakeCase name}}.route.ts",
				templateFile: "plop_templates/routes/delete_route.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/index.ts",
				templateFile: "plop_templates/routes/index.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/helpers.ts",
				templateFile: "plop_templates/routes/helpers.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/validation/create_{{snakeCase name}}.validation.ts",
				templateFile:
					"plop_templates/route_validation/create_route_validation.temp.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/api/v1/routes/{{snakeCase name}}s/validation/update_{{snakeCase name}}.validation.ts",
				templateFile:
					"plop_templates/route_validation/update_route_validation.temp.hbs",
				skipIfExists: true,
			},
		],
	});

	plop.setGenerator("common", {
		description: "Service Common code.",
		prompts: [],
		actions: [
			{
				type: "add",
				path: "src/api/common/validation/route_params.validation.ts",
				templateFile:
					"plop_templates/route_validation/route_params_validation.temp.hbs",
				skipIfExists: true,
			},
		],
	});

	// plop.setHelper("titleCase", (str: string) => {
	//    return str.replace(/\w\S*/g, function (txt) {
	//      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	//    });
	// })

	// plop.setHelper("snakeCase", (str: string) => {
	//   return str
	//     .match(
	//       /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
	//     )!
	//     .map((x) => x.toLowerCase())
	//     .join("_");
	// })

	// plop.setHelper("camelCase", (str: string) => {
	//   return str
	//     .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
	//       return index === 0 ? word.toLowerCase() : word.toUpperCase();
	//     })
	//     .replace(/\s+/g, "");
	// })
}
