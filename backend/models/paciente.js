const { DataTypes, sequelize } = require("../dbConfig");
// Definimos el modelo de la tabla
const Paciente = sequelize.define(
  "Paciente",
  {
    dni: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "paciente",
    primaryKey: "id",
  }
);

module.exports = Paciente;
