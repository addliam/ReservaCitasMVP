const { QueryTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const Consultorio = require("../models/consultorio");
const Especialidad = require("../models/especialidad");
const Medico = require("../models/medico");
const Empresa = require("../models/empresa");

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

const getMedicoEspecialidadListById = async (req, res) => {
  try {
    const { id } = req.user;
    const especialidadesLista = await MedicoEspecialidad.findAll({
      attributes: ["id", "precio"],
      where: {
        medicoId: id,
      },
      include: {
        model: Especialidad,
        as: "especialidad",
        attributes: ["id", "nombre"],
      },
    });
    return res.status(200).json(especialidadesLista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getMedicoEspecialidadListById",
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

const getMedicoEspecialidadInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MedicoEspecialidad.findByPk(id, {
      attributes: ["id", "precio"],
      include: [
        {
          model: Medico,
          as: "medico",
          attributes: ["id", "nombre", "apellidos"],
          include: {
            model: Empresa,
            as: "empresa",
            attributes: ["id", "nombre"],
          },
        },
        {
          model: Especialidad,
          as: "especialidad",
          attributes: ["id", "nombre"],
        },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getMedicoEspecialidadInfoById",
    });
  }
};

module.exports = {
  getTodosMedicoEspecialidad,
  getTodosPretty,
  getMedicoEspecialidadInfoById,
  getMedicoEspecialidadListById,
};
