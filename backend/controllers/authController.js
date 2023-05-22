const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const Paciente = require("../models/paciente");
const RegistroPaciente = require("../models/registroPaciente");
const Medico = require("../models/medico");
const Empresa = require("../models/empresa");
// res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
const googleAuthentication = async (req, res) => {
  const COOKIE_OPTIONS = {
    path: "/",
  };
  try {
    const { client_id, credential } = req.body;
    const inputRol = req.query.rol;
    // console.log({ inputRol });
    const rol = inputRol.toLowerCase();
    // console.log({ client_id, credential, rol });

    if (!rol) {
      // console.log("Falta rol en la consulta");
      return res.redirect("${process.env.CLIENT_URL}/error");
    }
    const roles = ["paciente", "empresa", "medico"];
    if (!roles.includes(rol)) {
      // console.log("Rol desconocido. Intenta de nuevo");
      return res.redirect("${process.env.CLIENT_URL}/error");
    }
    if (!credential) {
      // console.log("Falta credential en la consulta");
      return res.redirect("${process.env.CLIENT_URL}/error");
    }
    const GOOGLE_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
    const client = new OAuth2Client(GOOGLE_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_ID,
    });
    const payload = ticket.getPayload();

    const { email, given_name, family_name, sub } = payload;

    // [*] Si el usuario es paciente - Testeado ambos casos funcionando
    if (rol == "paciente") {
      const registroPacientePorEmail = await RegistroPaciente.findOne({
        where: {
          email: email,
        },
      });
      // si el usuario ya se encuentra registrado
      if (registroPacientePorEmail) {
        // console.log(`El usuario ya se encuentra registrado [SI]`);
        const payload = {
          rol: "paciente",
          id: registroPacientePorEmail.pacienteId,
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: "23h" };

        const token = jwt.sign(payload, secret, options);
        res.cookie("jwt", token, COOKIE_OPTIONS);
        return res.redirect(`${process.env.CLIENT_URL}/hospital/buscar`);
        // return res.status(409).json({
        //   message: "El email del usuario ya se encuentra registrado",
        //   token: token,
        // });
      }
      // si el usuario es nuevo en la plataforma
      // console.log(`El usuario ya se encuentra registrado [NO]`);
      const nuevoPaciente = await Paciente.create({
        nombre: given_name,
        apellidos: family_name,
      });
      const nuevoRegistroPaciente = await RegistroPaciente.create({
        pacienteId: nuevoPaciente.id,
        email: email,
        google_id: sub,
        proveedor: "Google",
      });
      const payload = {
        rol: "paciente",
        id: nuevoRegistroPaciente.id,
      };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "23h" };
      const tokenNuevoPaciente = jwt.sign(payload, secret, options);
      res.cookie("jwt", tokenNuevoPaciente, COOKIE_OPTIONS);
      return res.redirect(`${process.env.CLIENT_URL}/perfil`);
      // return res.status(201).json({
      //   message: "Registro realizado con exito",
      //   token: tokenNuevoPaciente,
      // });
    }
    // [*] Si el usuario es Medico
    else if (rol === "medico") {
      const existeMedico = await Medico.findOne({
        where: {
          email: email,
        },
      });
      if (existeMedico) {
        const payload = {
          rol: "medico",
          id: existeMedico.id,
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: "23h" };
        const token = jwt.sign(payload, secret, options);
        res.cookie("jwt", token, COOKIE_OPTIONS);
        return res.redirect(`${process.env.CLIENT_URL}/perfil`);
      }
      // si el medico es nuevo, lo registramos
      const nuevoMedico = await Medico.create({
        nombre: given_name,
        apellidos: family_name,
        email: email,
      });
      const payload = {
        rol: "medico",
        id: nuevoMedico.id,
      };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "23h" };
      const tokenNuevoMedico = jwt.sign(payload, secret, options);
      res.cookie("jwt", tokenNuevoMedico, COOKIE_OPTIONS);
      return res.redirect(`${process.env.CLIENT_URL}/perfil`);
      // [*] Si el usuario es Empresa
    } else if (rol === "empresa") {
      const existeEmpresa = await Empresa.findOne({
        where: {
          email: email,
        },
      });
      if (existeEmpresa) {
        const payload = {
          id: existeEmpresa.id,
          rol: "empresa",
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: "23h" };
        const token = jwt.sign(payload, secret, options);
        res.cookie("jwt", token, COOKIE_OPTIONS);
        return res.redirect(`${process.env.CLIENT_URL}/perfil`);
      }
      // si no esta registrado, empezamos el registro
      // TODO: quiza permitir solo quienes tengan dominio
      var DOMINIO_EMPRESA = false;
      if (!email.endsWith("gmail.com") || !email.endsWith("yahoo.com")) {
        DOMINIO_EMPRESA = true;
      }
      const nuevaEmpresa = await Empresa.create({
        email: email,
        nombre: given_name,
      });
      const payload = {
        id: nuevaEmpresa.id,
        rol: "empresa",
      };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "23h" };
      const tokenNuevaEmpresa = jwt.sign(payload, secret, options);
      res.cookie("jwt", tokenNuevaEmpresa, COOKIE_OPTIONS);
      return res.redirect(`${process.env.CLIENT_URL}/perfil`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect("${process.env.CLIENT_URL}/error");
  }
};
// Podemos mejorar la eficiencia cambiando esta unica entrada por las entradas dentro de cada ruta /rol
// el unico inconveniente seria cambiar el login_uri del boton en el frontend de acuerdo a la seleccion de rol
module.exports = { googleAuthentication };
