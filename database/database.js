const Sequelize = require("sequelize");

const connection = new Sequelize("guia_perguntas", "root", "f5+ti258", {
    host: "192.168.0.179",
    dialect: "mysql"
});

module.exports = connection;
