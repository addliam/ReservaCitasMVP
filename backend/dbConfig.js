const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  // TODO: almacenar string en environment variable
  "postgres://postgres:TryHackM3@localhost:5432/reservacita"
);

module.exports = {
  sequelize,
  DataTypes,
};
