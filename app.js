const express = require("express");
const db = require("./db");

const app = express();

app.get("/", async (request, response, next) => {
	try {
		const licenses = await db.getLicenses();
		return response.send(licenses);
	} catch (error) {
		return next(error);
	}
});

app.get("/:key", async (request, response, next) => {
	try {
		const { key } = request.params;
		const license = await db.getLicenseByKey(key);
		if (!license) {
			return response.sendStatus(404);
		}
		return response.send(license);
	} catch (error) {
		return next(error);
	}
});

module.exports = app;
