const { DataTypes, sequelize } = require("../dbConfig");
const Empresa = require("./empresa");
// Definimos el modelo de la tabla
const Medico = sequelize.define(
  "medico",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "medico",
    primaryKey: "id",
  }
);

Medico.belongsTo(Empresa, { foreignKey: "empresaId" });

module.exports = Medico;
