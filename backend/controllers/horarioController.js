const { Op } = require("sequelize");
const Cita = require("../models/cita");
const Horario = require("../models/horario");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const divideIntervalo = require("../utils/divideIntervalo");
const {
  generarRangoHorasSegunHorario,
} = require("../utils/generarRangoHorasSegunHorario");
const moment = require("moment");
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
    const medicoEspecialidadId = req.params.id;
    // const medicoEspecialidadId = ;
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

const getHorariosOcupadosDelMesPorMedEspId = async (req, res) => {
  try {
    const { id } = req.params;
    const today = moment();
    const lastDayString = moment().endOf("month").format("YYYY-MM-DD");
    const todayString = today.format("YYYY-MM-DD");
    const medicoEspData = await MedicoEspecialidad.findByPk(id);
    const citasOcupadas = await Cita.findAll({
      attributes: ["id", "fecha", "hora", "estado"],
      where: {
        medicoId: medicoEspData.medicoId,
        especialidadId: medicoEspData.especialidadId,
        fecha: {
          [Op.between]: [todayString, lastDayString],
        },
        [Op.or]: [
          {
            estado: "pendiente",
            estado: "confirmada",
          },
        ],
      },
    });
    return res.status(200).json(citasOcupadas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getHorariosDelMesOcupadosPorMedEspId",
    });
  }
};

module.exports = {
  getTodosHorarios,
  getHorarioPorMedicoEspecialidadId,
  getHorariosOcupadosDelMesPorMedEspId,
};
