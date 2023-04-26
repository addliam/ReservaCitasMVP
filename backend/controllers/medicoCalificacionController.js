const MedicoCalificacion = require("../models/medicoCalificacion");

const getTodasMedicoCalificacion = async (req, res) => {
  try {
    const medicoCalificacion = await MedicoCalificacion.findAll();
    return res.status(200).json(medicoCalificacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasMedicoCalificacion",
    });
  }
};

module.exports = {
  getTodasMedicoCalificacion,
};
