const Especialidad = require("../models/especialidad");
// const iconv = require("iconv-lite");

const getTodasEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll({
      order: [["nombre", "ASC"]],
    });
    // console.log(
    //   iconv.encode(JSON.stringify(especialidades[0]), "utf-8").toString()
    // );
    // console.log(JSON.stringify(especialidades[0]));
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
