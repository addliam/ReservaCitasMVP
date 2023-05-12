const { DataTypes, sequelize } = require("../dbConfig");

// Definimos el modelo de la tabla
const Especialidad = sequelize.define(
  "especialidad",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  },
  {
    timestamps: true,
    // To avoid pluralization especialidads
    tableName: "especialidad",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

module.exports = Especialidad;
