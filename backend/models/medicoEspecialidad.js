const { DataTypes, sequelize } = require("../dbConfig");
const Medico = require("./medico");
const Especialidad = require("./especialidad");
const Consultorio = require("./consultorio");

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

MedicoEspecialidad.belongsTo(Medico, { foreignKey: "medicoId" });
MedicoEspecialidad.belongsTo(Especialidad, { foreignKey: "especialidadId" });
MedicoEspecialidad.belongsTo(Consultorio, { foreignKey: "consultorioId" });

module.exports = MedicoEspecialidad;
