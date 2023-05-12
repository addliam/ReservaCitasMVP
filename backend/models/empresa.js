const { DataTypes, sequelize } = require("../dbConfig");

// Definimos el modelo de la tabla
const Empresa = sequelize.define(
  "empresa",
  {
    // slug es el link de acceso a la informacion /clinica-ricardo-palma
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    ruc: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING(255),
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
    departamento: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    provincia: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    distrito: {
      type: DataTypes.STRING(100),
      unique: true,
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
