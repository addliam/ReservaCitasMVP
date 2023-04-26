const { DataTypes, sequelize } = require("../dbConfig");
const Empresa = require("./empresa");

// Definimos el modelo de la tabla
const Consultorio = sequelize.define(
  "consultorio",
  {
    numero: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: "consultorio",
    // Specify the existing 'id' column from the PostgreSQL table as the primary key
    primaryKey: "id",
  }
);

Consultorio.belongsTo(Empresa, { foreignKey: "empresaId" });
module.exports = Consultorio;
