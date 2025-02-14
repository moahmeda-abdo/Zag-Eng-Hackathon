import path from "path";
import env from "dotenv";
env.config({ path: path.join(__dirname, "../.env") });

import { initializeLogger, Logger } from "./utils/logger";
import { initMongoDBConnection } from "./core/db/connect_db";

import { app } from "./app";

// import "./core/db/connect_db";

function validateENVS(envList: string[]) {
	const requiredEnv = new Set(["PORT", ...envList]);
	requiredEnv.forEach((env) => {
		if (!process.env[env]) {
			throw new Error(`ENV: ( ${env} ) Must Be Provided`);
		}
	});
}

(async (serviceName: string) => {

// console.log({env : process.env})

	try {
		initializeLogger(serviceName);
		validateENVS([
			"MONGODB_URI_DEV",
			"MONGODB_URI_PRODUCTION",
			"NODE_ENV",
			"JWT_KEY",
		]);
         
    await initMongoDBConnection();
		const port = +(process.env.PORT ?? "0") || 4000;
		app.listen(port, () => {
			Logger?.info(
				`${serviceName.toUpperCase()} Service Started Successfully On Port ${port}`
			);
			Logger?.info(
				`application is up and running on http://localhost:${port}`
			);
		});
	} catch (err) {
		console.log(err);
		Logger?.error(err);
		process.exit(0);
	}
})("default");
