const config = require("./knexfile");
const knex = require("knex")(config);

const getLicenses = () => knex("licenses").orderBy("key");

const getLicenseByKey = (key) => knex("licenses").where("key", key).first();

module.exports = {
	knex,
	getLicenses,
	getLicenseByKey,
};
