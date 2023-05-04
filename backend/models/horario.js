const { DataTypes, sequelize } = require("../dbConfig");
const MedicoEspecialidad = require("./medicoEspecialidad");
// Definimos el modelo de la tabla
const Horario = sequelize.define(
  "horario",
  {
    diaSemana: {
      type: DataTypes.INTEGER,
    },
    horaInicio: {
      type: DataTypes.TIME,
    },
    horaFin: {
      type: DataTypes.TIME,
    },
  },
  {
    timestamps: true,
    tableName: "horario",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

Horario.belongsTo(MedicoEspecialidad, {
  as: "medicoEspecialidad",
  foreignKey: "medicoEspecialidadId",
});
MedicoEspecialidad.hasMany(Horario, {
  as: "horario",
  foreignKey: "medicoEspecialidadId",
});
module.exports = Horario;
