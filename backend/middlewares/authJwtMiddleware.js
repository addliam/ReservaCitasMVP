const jwt = require("jsonwebtoken");
// la funcion de este token es verificar la autenticidad del token enviado por header authorization
// el token debe tener el modelo `Bearer {token}` y estar registrado previamente para que sea exitoso y se pase en req.user
const verifyIdToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporciono un token de autorizacion" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "Token de autenticacion invalido" });
  }
};

module.exports = verifyIdToken;
