const Sequelize = require("sequelize");

const connection = new Sequelize("guia_perguntas", "root", "igor1234", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
