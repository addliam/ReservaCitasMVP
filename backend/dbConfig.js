const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  // TODO: almacenar string en environment variable
  process.env.POSTGRES_CONNECTION_STRING,
  {
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  }
);

module.exports = {
  sequelize,
  DataTypes,
};
