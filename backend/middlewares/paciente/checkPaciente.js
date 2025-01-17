const checkPaciente = (req, res, next) => {
  if (req.user.rol != "paciente") {
    return res.status(401).json({
      message: "Usuario no autorizado",
      detail: "checkPaciente",
    });
  }
  next();
};

module.exports = checkPaciente;
