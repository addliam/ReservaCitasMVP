const Medico = require("../models/medico");

const getTodosMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    return res.status(200).json(medicos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosMedicos",
    });
  }
};

module.exports = {
  getTodosMedicos,
};
