const jwt = require("jsonwebtoken");

const Paciente = require("../models/paciente");
const RegistroPaciente = require("../models/registroPaciente");
const { where } = require("sequelize");

const getTodosPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    return res.status(200).json(pacientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosPacientes",
    });
  }
};

const getPacienteInformacion = async (req, res) => {
  try {
    const { id, rol } = req.user;
    if (rol != "paciente") {
      return res.status(401).json({
        message: "Usuario no autorizado",
        detail: "getPacienteInformacion",
      });
    }
    const infoPaciente = await Paciente.findByPk(id, {
      include: {
        model: RegistroPaciente,
        attributes: ["email"],
      },
    });
    if (!infoPaciente) {
      return res.status(403).json({
        message: "El id proporcionado en el token no se encontro",
        detail: "Reportalo con los administradores",
      });
    }
    return res.status(200).json(infoPaciente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getPacienteInformacion",
    });
  }
};

const postPaciente = async (req, res) => {
  try {
    const { email, given_name, family_name, sub } = req.payload;
    const registroPacientePorEmail = await RegistroPaciente.findOne({
      where: {
        email: email,
      },
    });
    // si el usuario ya se encuentra registrado
    if (registroPacientePorEmail) {
      const payload = {
        rol: "paciente",
        id: registroPacientePorEmail.pacienteId,
      };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "23h" };
      const token = jwt.sign(payload, secret, options);
      return res.status(409).json({
        message: "El email del usuario ya se encuentra registrado",
        token: token,
      });
    }
    // si el usuario es nuevo en la plataforma
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

    return res.status(201).json({
      message: "Registro realizado con exito",
      token: tokenNuevoPaciente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el registro paciente",
      detail: "postPaciente",
    });
  }
};

const updatePacienteInfo = async (req, res) => {
  // TODO: actualizar nombre y apellido
  try {
    const pacienteId = req.user.id;
    const { nombre, apellidos, dni, fechaNacimiento, direccion, telefono } =
      req.body;
    if (!dni || !fechaNacimiento || !direccion || !telefono) {
      return res.status(400).json({
        message: "Todos los campos deben ser proporcionados",
        detail: "dni, fechaNacimiento, direccion, telefono",
      });
    }
    // TODO: validacion de datos
    const updatedPaciente = await Paciente.update(
      {
        nombre: nombre,
        apellidos: apellidos,
        dni: dni,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        telefono: telefono,
      },
      {
        where: {
          id: pacienteId,
        },
      }
    );
    return res.status(201).json({
      message: "Informacion del paciente actualizada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el registro paciente",
      detail: "updatePacienteInfo",
    });
  }
};

module.exports = {
  getTodosPacientes,
  postPaciente,
  getPacienteInformacion,
  updatePacienteInfo,
};
