const RegistroPaciente = require("../models/registroPaciente");

const getTodosRegistrosPaciente = async (req, res) => {
  try {
    const registrosPacientes = await RegistroPaciente.findAll();
    return res.status(200).json(registrosPacientes);
    // TODO: protect this w auth middleware
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosRegistrosPaciente",
    });
  }
};

module.exports = {
  getTodosRegistrosPaciente,
};
