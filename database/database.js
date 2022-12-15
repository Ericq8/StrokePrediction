const Sequelize = require("sequelize");

module.exports = new Sequelize("mydb", "eric", "123456", {
    host: "localhost",
    dialect: "postgres",
});