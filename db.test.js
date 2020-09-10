const db = require("./db");
const { knex } = require("./db");

afterAll(async () => {
	await knex.destroy();
});

describe("getLicenses", () => {
	it("should return at least 1 license with the correct properties", async () => {
		const licenses = await db.getLicenses();
		expect(licenses.length).toBeGreaterThanOrEqual(0);
		expect(licenses[0]).toHaveProperty("key");
		expect(licenses[0]).toHaveProperty("name");
		expect(licenses[0]).toHaveProperty("body");
	});
});

describe("getLicense", () => {
	it("should return a known license", async () => {
		const license = await db.getLicenseByKey("mit");
		expect(license).toBeDefined();
		expect(license).toHaveProperty("name", "MIT License");
	});
	it("should return undefined for an unknown license", async () => {
		const license = await db.getLicenseByKey("unknown");
		expect(license).toBeUndefined();
	});
});
