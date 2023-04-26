const Consultorio = require("../models/consultorio");

const getTodosConsultorio = async (req, res) => {
  try {
    const consultorios = await Consultorio.findAll();
    return res.status(200).json(consultorios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosConsultorio",
    });
  }
};

module.exports = {
  getTodosConsultorio,
};
