const Horario = require("../models/horario");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const divideIntervalo = require("../utils/divideIntervalo");
const {
  generarRangoHorasSegunHorario,
} = require("../utils/generarRangoHorasSegunHorario");
const getTodosHorarios = async (req, res) => {
  try {
    const horario = await Horario.findAll();
    return res.status(200).json(horario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosHorarios",
    });
  }
};

const getHorarioPorMedicoEspecialidadId = async (req, res) => {
  try {
    // const medicoEspecialidadId = req.params.id
    const medicoEspecialidadId = 10;
    const result = await Horario.findAll({
      attributes: ["id", "diaSemana", "horaInicio", "horaFin"],
      where: {
        medicoEspecialidadId: medicoEspecialidadId,
      },
    });
    const formattedResult = generarRangoHorasSegunHorario(result);
    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getHorarioPorMedicoEspecialidadId",
    });
  }
};

module.exports = {
  getTodosHorarios,
  getHorarioPorMedicoEspecialidadId,
};
