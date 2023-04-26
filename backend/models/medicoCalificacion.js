const { DataTypes, sequelize } = require("../dbConfig");
const Medico = require("./medico");
const Paciente = require("./paciente");
// Definimos el modelo de la tabla
const MedicoCalificacion = sequelize.define(
  "medicoCalificacion",
  {
    medicoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "medico",
        key: "id",
      },
      primaryKey: true,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: "paciente",
        key: "id",
      },
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "medicoCalificacion",
    primaryKey: {
      fields: ["medicoId", "pacienteId"],
    },
  }
);

MedicoCalificacion.belongsTo(Medico, { foreignKey: "medicoId" });
MedicoCalificacion.belongsTo(Paciente, { foreignKey: "pacienteId" });

module.exports = MedicoCalificacion;
