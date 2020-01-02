//const environment = process.env.NODE_ENV;
const environment = 'production';
const config = require("../../knexfile.js")[environment];
module.exports = require("knex")(config);
