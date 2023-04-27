const jwt = require("jsonwebtoken");
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

const getEmpresaInfo = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.user.id);
    return res.status(200).json(empresa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getEmpresaInfo",
    });
  }
};

const postEmpresa = async (req, res) => {
  try {
    const { email, given_name, family_name, sub } = req.payload;
    // TODO: ruc validation n stuffs
    const existeEmpresa = await Empresa.findOne({
      where: {
        email: email,
      },
    });
    if (existeEmpresa) {
      const payload = {
        rol: "empresa",
        id: existeEmpresa.id,
      };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "23h" };
      const token = jwt.sign(payload, secret, options);
      return res.status(409).json({
        message: "El email de la empresa ya se encuentra registrado",
        token: token,
      });
    }
    // si no esta registrado, empezamos el registro
    // TODO: quiza permitir solo quienes tengan dominio
    var DOMINIO_EMPRESA = false;
    if (!email.endsWith("gmail.com") || !email.endsWith("yahoo.com")) {
      DOMINIO_EMPRESA = true;
    }
    const nuevaEmpresa = Empresa.create({
      email: email,
      nombre: given_name,
    });
    const payload = {
      rol: "empresa",
      id: nuevaEmpresa.id,
    };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "23h" };
    const tokenNuevaEmpresa = jwt.sign(payload, secret, options);
    return res.status(201).json({
      message: "Registro realizado con exito",
      token: tokenNuevaEmpresa,
      detalle: DOMINIO_EMPRESA
        ? ""
        : "Estas registrandote con un dominio que NO es empresarial",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "postEmpresa",
    });
  }
};

// authJwt
const updateEmpresaInfo = async (req, res) => {
  try {
    // para evitar IDOR y decodificar el token en frontend la ruta para actualizar sera simple /
    // TODO: validation
    const empresaId = req.user.id;
    const {
      ruc,
      direccion,
      telefono,
      contrasenia,
      departamento,
      provincia,
      distrito,
    } = req.body;
    // de estos campos no son requisitos, ruc, contrasenia porque se pueden actualizar mas adelante
    // contrasenia puede servir para uso compartido ? evaluar si es factible agregar moderadores de empresa | contrasenia debe ser encriptada
    if (!direccion || !telefono || !departamento || !provincia || !distrito) {
      return res.status(400).json({
        message: "No proporcionaste los campos obligatorios",
        detail: "direccion, telefono, departamento, provincia, distrito",
      });
    }
    const updatedEmpresa = Empresa.update(
      {
        ruc: ruc || Empresa.ruc, // If ruc is not present in req.body, use the current value in the database
        direccion: direccion || Empresa.direccion,
        telefono: telefono || Empresa.telefono,
        contrasenia: contrasenia || Empresa.contrasenia,
        departamento: departamento || Empresa.departamento,
        provincia: provincia || Empresa.provincia,
        distrito: distrito || Empresa.distrito,
      },
      {
        where: {
          id: empresaId,
        },
      }
    );
    return res.status(201).json({
      message: "Informacion de la empresa actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "updateEmpresaInfo",
    });
  }
};

const none = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "postEmpresa",
    });
  }
};
module.exports = {
  getTodasEmpresas,
  postEmpresa,
  updateEmpresaInfo,
  getEmpresaInfo,
};
