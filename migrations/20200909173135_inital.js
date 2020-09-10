const Knex = require("knex");

/**
 *
 * @param {Knex} knex
 */
exports.up = function (knex) {
	return knex.schema.createTable("licenses", (table) => {
		table.string("key", 60).primary();
		table.string("spdx_id", 254);
		table.string("name", 254);
		table.string("url", 254);
		table.text("description");
		table.text("body");
	});
};

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
	return knex.schema.dropTable("licenses");
};
