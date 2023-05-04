const checkMedico = (req, res, next) => {
  if (req.user.rol != "medico") {
    return res.status(401).json({
      message: "Usuario no autorizado",
      detail: "checkMedico",
    });
  }
  next();
};

module.exports = checkMedico;
