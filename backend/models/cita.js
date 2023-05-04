const { DataTypes, sequelize } = require("../dbConfig");
const Especialidad = require("./especialidad");
const Medico = require("./medico");
const Paciente = require("./paciente");

const CitaEstado = DataTypes.ENUM(
  "pendiente",
  "confirmada",
  "cancelada",
  "atendida",
  "ausente",
  "reagendada"
);

// Definimos el modelo de la tabla
const Cita = sequelize.define(
  "cita",
  {
    fecha: {
      type: DataTypes.DATE,
    },
    hora: {
      type: DataTypes.TIME,
    },
    estado: {
      type: CitaEstado,
      defaultValue: "pendiente",
    },
  },
  {
    timestamps: true,
    tableName: "cita",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

Cita.belongsTo(Medico, { as: "medico", foreignKey: "medicoId" });
Medico.hasMany(Cita, { as: "cita", foreignKey: "medicoId" });
Cita.belongsTo(Paciente, { as: "paciente", foreignKey: "pacienteId" });
Paciente.hasMany(Cita, { as: "cita", foreignKey: "pacienteId" });
Cita.belongsTo(Especialidad, {
  as: "especialidad",
  foreignKey: "especialidadId",
});
Especialidad.hasMany(Cita, {
  as: "cita",
  foreignKey: "especialidadId",
});

module.exports = Cita;
