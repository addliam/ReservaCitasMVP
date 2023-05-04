const Horario = require("../models/horario");
const MedicoEspecialidad = require("../models/medicoEspecialidad");

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

module.exports = {
  getTodosHorarios,
};
