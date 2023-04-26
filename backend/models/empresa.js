const { DataTypes, sequelize } = require("../dbConfig");

// Definimos el modelo de la tabla
const Empresa = sequelize.define(
  "empresa",
  {
    ruc: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
    },
    direccion: {
      type: DataTypes.STRING(255),
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    tableName: "empresa",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

module.exports = Empresa;
