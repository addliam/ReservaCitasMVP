const Especialidad = require("../models/especialidad");

const getTodasEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    return res.status(200).json(especialidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasEspecialidades",
    });
  }
};

module.exports = {
  getTodasEspecialidades,
};
