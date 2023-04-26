const Empresa = require("../models/empresa");

const getTodasEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    return res.status(200).json(empresas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasEmpresas",
    });
  }
};

module.exports = {
  getTodasEmpresas,
};
