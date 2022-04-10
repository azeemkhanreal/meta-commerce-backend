const crudControllers = require("../../util/crud");
const Product = require("./product.model");

module.exports = crudControllers(Product);
