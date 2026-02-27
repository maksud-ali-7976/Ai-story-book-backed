import { Elysia } from "elysia";

import { html } from "@elysiajs/html";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import AppErr from "./utils/AppErr";

import { bearer } from "@elysiajs/bearer";
import {  userRoutes } from "./api/user/user.index";
import env from "./config/env";
import moment from "moment";

import { createElysia, Logger } from "./utils/createElysia";
import { logger } from "@typegoose/typegoose/lib/logSettings";
import { R } from "./utils/response-helpers";
import { connectDB } from "./db/mongo";

import { ModuleId } from "./config/modules";


declare module "elysia" {}

const app = createElysia({ normalize: false });

app.onRequest((ctx: any) => {
	ctx.logger = new Logger();
	ctx.logger.add(`Request`);
	ctx.logger.add(`${ctx.request.method} - ${(ctx as any).path}`);
});

app.onAfterHandle(({ logger, response }) => {
	logger.add("Response - ");
	logger.add(JSON.stringify(response, null, 2).substring(0, 150));
	logger.add("Request End");
	logger.print();
});

app.use(
	cors({
		methods: "*",
		origin: ({ headers }) => {
			return true;
		},
	}),
);

app.onError(({ error, code, set, ...rest }: any) => {
	if (error instanceof AppErr) {
		set.status = "OK";
		return R(error.message, null, false);
	}

	const errorType = "type" in error ? error.type : "internal";

	if (errorType == "internal") {
		console.log(`${errorType} ERROR: ${JSON.stringify(error, null, 2)}`);
		set.status = "OK";
		return { status: false, message: error.message, data: null };
	} else if (errorType == "response") {
		set.status = "OK";
		const result = JSON.parse(error?.message);
		return result?.found;
	} else if (["body", "query"].includes(errorType)) {
		set.status = "OK";
		const result = JSON.parse(error?.message);
		const message = result.errors
			.map(
				(err: any) =>
					`${err.path.replace("/", "").replace("_", " ").toUpperCase()} ${
						err.message
					}`,
			)
			.join("\n");

		return { status: false, message: message, data: null };
	}
	console.log(`${errorType} ERRRO ❌: ${JSON.stringify(error, null, 2)}`);

	return { status: false, message: error.message, data: null };
});

app.onTransform(({ body = {}, params = {}, query = {}, logger }) => {
	const removeWasteFromObject = (obj: Record<string, any> | any) => {
		for (let key in obj) {
			let value = obj[key];
			if (typeof value == "object" && !Array.isArray(value)) {
				// removeWasteFromObject(obj);
				continue;
			}

			if (value === "") {
				delete obj[key];
			}
		}
	};
	removeWasteFromObject(body);
	removeWasteFromObject(params);
	removeWasteFromObject(query);

	if (Object.keys(params).length) {
		logger.add("Params - ");
		logger.add(JSON.stringify(params, null, 2));
	}

	if (Object.keys(query).length) {
		logger.add("Query - ");
		logger.add(JSON.stringify(query, null, 2));
	}

	if (Object.keys(body as any).length) {
		logger.add("Body -");
		logger.add(JSON.stringify(body, null, 2));
	}
});

app.use(bearer());

app.use(html());

app.onAfterHandle((ctx) => {
	const isJsonPath = ctx.path.includes("/json");
	const handleJsonSchema = (obj: any) => {
		for (let key in obj) {
			let value = obj[key];
			if (typeof value == "object" && !Array.isArray(value)) {
				if (`${key}`.startsWith("/admin")) {
					continue;
				}
				// if (value.description == "upload") {
				// 	value.consumes = ["multipart/form-data"];
				// 	delete obj[key];
				// }
				// if (value?.description == "file") {
				// 	for (let jkey in value) {
				// 		if (jkey != "type") {
				// 			delete value[jkey];
				// 		}
				// 	}
				// 	value.type = "file";
				// 	// value.format = "binary";
				// }
				handleJsonSchema(obj[key]);
			}
		}
		return obj;
	};

	if (isJsonPath) {
		handleJsonSchema(ctx.response);
	}
});

app
	.use(
		swagger({
			path: "/swagger-user-app",
			provider: "scalar",
			exclude: new RegExp(/^(?!\/user).*/),
			swaggerOptions: {
				persistAuthorization: true,
			},

			documentation: {
				info: {
					title: "Ai Story Book API Documentation",
					version: "0.0.1",
				},
			},
		}),
	)
	

app.use(userRoutes);




connectDB("APP").then((d) => {
	app.listen(env.port || 8080);
	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${
			env.port || 8080
		} ${moment().format("h:mm:ss a, MMMM Do YYYY")}`,
	);
});
