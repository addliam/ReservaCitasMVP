const checkEmpresa = (req, res, next) => {
  if (req.user.rol !== "empresa") {
    return res.status(401).json({
      message: "Usuario no autorizado",
      detail: "checkEmpresa",
    });
  }
  next();
};
module.exports = checkEmpresa
