const { sequelize, DataTypes } = require("../dbConfig");
const Empresa = require("./empresa");
const Medico = require("./medico");
// Definimos el modelo de la tabla
const EstadoAprobacionEnum = DataTypes.ENUM(
  "pendiente",
  "aprobado",
  "rechazado"
);
const SolicitudesAprobacion = sequelize.define(
  "solicitudesAprobacion",
  {
    estado: {
      type: EstadoAprobacionEnum,
      defaultValue: "pendiente",
    },
  },
  {
    timestamps: true,
    tableName: "solicitudesAprobacion",
    primaryKey: "id",
  }
);

SolicitudesAprobacion.belongsTo(Empresa, { foreignKey: "empresaId" });
SolicitudesAprobacion.belongsTo(Medico, { foreignKey: "medicoId" });

module.exports = SolicitudesAprobacion;
