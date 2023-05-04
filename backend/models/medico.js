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
      allowNull: true,
    },
    aprobacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "medico",
    primaryKey: "id",
  }
);
Empresa.hasMany(Medico, { as: "medico", foreignKey: "empresaId" });
Medico.belongsTo(Empresa, { as: "empresa", foreignKey: "empresaId" });
module.exports = Medico;
