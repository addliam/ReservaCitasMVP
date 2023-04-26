const { DataTypes, sequelize } = require("../dbConfig");
const Paciente = require("./paciente");
// Definimos el modelo de la tabla
const RegistroPaciente = sequelize.define(
  "registroPaciente",
  {
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    proveedor: {
      type: DataTypes.STRING(32),
      unique: true,
    },
    google_id: {
      type: DataTypes.STRING(120),
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "registroPaciente",
    primaryKey: "id",
  }
);
RegistroPaciente.belongsTo(Paciente, { foreignKey: "pacienteId" });

module.exports = RegistroPaciente;
