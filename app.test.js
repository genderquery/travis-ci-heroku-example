const request = require("supertest");
const app = require("./app");
const db = require("./db");

jest.mock("./db");

describe("GET /", () => {
	it("should return a list of licenses", async () => {
		db.getLicenses.mockResolvedValueOnce([mockLicense]);
		const response = await request(app).get("/");
		expect(db.getLicenses).toHaveBeenCalled();
		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThanOrEqual(1);
		expect(response.body[0]).toHaveProperty("key");
		expect(response.body[0]).toHaveProperty("name");
		expect(response.body[0]).toHaveProperty("body");
	});
});

describe("GET /:key", () => {
	it("should return a known license", async () => {
		db.getLicenseByKey.mockResolvedValueOnce(mockLicense);
		const response = await request(app).get("/mit");
		expect(db.getLicenseByKey).toHaveBeenCalledWith("mit");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("name", "MIT License");
	});
	it("should return 404 for an unknown license", async () => {
		db.getLicenseByKey.mockResolvedValueOnce(undefined);
		const response = await request(app).get("/unknown");
		expect(db.getLicenseByKey).toHaveBeenCalledWith("unknown");
		expect(response.status).toBe(404);
	});
});

const mockLicense = {
	key: "mit",
	spdx_id: "MIT",
	name: "MIT License",
	url: "http://choosealicense.com/licenses/mit/",
	description:
		"A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.",
	body:
		"MIT License\n" +
		"\n" +
		"Copyright (c) [year] [fullname]\n" +
		"\n" +
		"Permission is hereby granted, free of charge, to any person obtaining a copy\n" +
		'of this software and associated documentation files (the "Software"), to deal\n' +
		"in the Software without restriction, including without limitation the rights\n" +
		"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n" +
		"copies of the Software, and to permit persons to whom the Software is\n" +
		"furnished to do so, subject to the following conditions:\n" +
		"\n" +
		"The above copyright notice and this permission notice shall be included in all\n" +
		"copies or substantial portions of the Software.\n" +
		"\n" +
		'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
		"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n" +
		"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n" +
		"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n" +
		"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n" +
		"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n" +
		"SOFTWARE.\n",
};
