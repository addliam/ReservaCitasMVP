const { OAuth2Client } = require("google-auth-library");

// la funcion de este middleware es autenticar el token generado por @auth-google en el frontend
// si todo va bien es decir TOKEN EXITOSO se apendiza la informacion devuelva a req.payload para futuro uso
const checkGoogleAuthToken = async (req, res, next) => {
  try {
    const GOOGLE_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
    const client = new OAuth2Client(GOOGLE_ID);
    const { token } = req.body;
    if (!token) {
      token = "";
    }
    // verify & decode token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    req.payload = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Token de autenticacion invalido",
      detail: "checkGoogleAuthToken",
    });
  }
};
module.exports = checkGoogleAuthToken;
