const { QueryTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const Consultorio = require("../models/consultorio");
const Especialidad = require("../models/especialidad");

const getTodosMedicoEspecialidad = async (req, res) => {
  try {
    // const medicoEspecialidades = await MedicoEspecialidad.findAll({
    //   include: [
    //     {
    //       model: Consultorio,
    //       attributes: ["numero"],
    //     },
    //     {
    //       model: Especialidad,
    //       attributes: ["nombre"],
    //     },
    //   ],
    // });
    const medicoEspecialidades = await MedicoEspecialidad.findAll();
    return res.status(200).json(medicoEspecialidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosMedicos",
    });
  }
};

const getTodosPretty = async (req, res) => {
  try {
    const medicoEspecialidades = await sequelize.query(
      `SELECT me.id, CONCAT(m.nombre, ' ', m.apellidos) as nombre_medico, e.nombre AS especialidad, c.numero AS consultorio, precio
        FROM "medicoEspecialidad" me
        JOIN medico m ON m.id = me."medicoId"
        JOIN especialidad e ON e.id = me."especialidadId"
        JOIN consultorio c ON c.id = me."consultorioId";`,
      { type: QueryTypes.SELECT }
    );
    return res.status(200).json(medicoEspecialidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosPretty",
    });
  }
};

module.exports = {
  getTodosMedicoEspecialidad,
  getTodosPretty,
};
