const { DataTypes, sequelize } = require("../dbConfig");
const Medico = require("./medico");
const Especialidad = require("./especialidad");
// const Consultorio = require("./consultorio");

// Definimos el modelo de la tabla
const MedicoEspecialidad = sequelize.define(
  "medicoEspecialidad",
  {
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "medicoEspecialidad",
    primaryKey: "id",
  }
);

MedicoEspecialidad.belongsTo(Medico, { as: "medico", foreignKey: "medicoId" });
MedicoEspecialidad.belongsTo(Especialidad, {
  as: "especialidad",
  foreignKey: "especialidadId",
});
// MedicoEspecialidad.belongsTo(Consultorio, { foreignKey: "consultorioId" });
Medico.hasMany(MedicoEspecialidad, {
  as: "medicoEspecialidad",
  foreignKey: "medicoId",
});
Especialidad.hasMany(MedicoEspecialidad, {
  as: "medicoEspecialidad",
  foreignKey: "especialidadId",
});
module.exports = MedicoEspecialidad;
