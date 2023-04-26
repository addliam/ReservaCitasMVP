const { DataTypes, sequelize } = require("../dbConfig");
const Especialidad = require("./especialidad");
const Medico = require("./medico");
const Paciente = require("./paciente");

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
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    tableName: "cita",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

Cita.belongsTo(Medico, { foreignKey: "medicoId" });
Cita.belongsTo(Paciente, { foreignKey: "pacienteId" });
Cita.belongsTo(Especialidad, { foreignKey: "especialidadId" });

module.exports = Cita;
