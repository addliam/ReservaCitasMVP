const Cita = require("../models/cita");

const getTodasCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasCitas",
    });
  }
};

module.exports = {
  getTodasCitas,
};
