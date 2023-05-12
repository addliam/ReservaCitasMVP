const jwt = require("jsonwebtoken");
const SolicitudesAprobacion = require("../models/solicitudesAprobacion");
const Empresa = require("../models/empresa");
const Medico = require("../models/medico");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const Especialidad = require("../models/especialidad");
const { Op } = require("sequelize");
const slugify = require("slugify");

const getAllEspecialidadesEmpresaPorId = async (req, res) => {
  try {
    const empresaId = req.params.id;
    const result = await Especialidad.findAll({
      disctinct: true,
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
      where: {
        "$medicoEspecialidad.medico.empresaId$": empresaId,
      },
      include: [
        {
          model: MedicoEspecialidad,
          as: "medicoEspecialidad",
          attributes: [],
          include: {
            model: Medico,
            as: "medico",
            attributes: [],
          },
        },
      ],
    });
    // const result = await MedicoEspecialidad.findAll({
    //   attributes: ["id"],
    //   where: { "$medico.empresaId$": empresaId },
    //   include: [
    //     {
    //       model: Medico,
    //       as: "medico",
    //       attributes: [],
    //     },
    //     {
    //       model: Especialidad,
    //       as: "especialidad",
    //       attributes: ["id", "nombre"],
    //     },
    //   ],
    // });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getAllEspecialidadesEmpresaPorId",
    });
  }
};

const getEmpresaEspecialidadesPorFiltro = async (req, res) => {
  // /:id/medicos/especialidad?id=12
  const empresaId = req.params.id;
  const especialidadId = req.query.id;
  // TODO: mandar solo datos de medicos q tengan horario xq habra conflicto en el frontend
  // TODO: mandar solo datos de medico verificado
  try {
    if (!especialidadId) {
      const result = await MedicoEspecialidad.findAll({
        attributes: ["id", "precio"],
        where: { "$medico.empresaId$": empresaId },
        include: [
          {
            model: Medico,
            as: "medico",
            attributes: ["id", "nombre", "apellidos", "empresaId"],
          },
          {
            model: Especialidad,
            as: "especialidad",
            attributes: ["id", "nombre"],
          },
        ],
      });
      return res.status(200).json(result);
      // si hay ?id= quiere decir q pasaron la especialidadId
    } else {
      const result = await MedicoEspecialidad.findAll({
        attributes: ["id", "precio"],
        where: {
          "$medico.empresaId$": empresaId,
          "$especialidad.id$": especialidadId,
        },
        include: [
          {
            model: Medico,
            as: "medico",
            attributes: ["id", "nombre", "apellidos", "empresaId"],
          },
          {
            model: Especialidad,
            as: "especialidad",
            attributes: ["id", "nombre"],
          },
        ],
      });
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getEmpresaEspecialidadesPorId",
    });
  }
};
const getEmpresaInfoPorSlug = async (req, res) => {
  try {
    const slug = req.params.name;
    const empresaInfo = await Empresa.findOne({
      attributes: [
        "id",
        "nombre",
        "direccion",
        "telefono",
        "email",
        "departamento",
        "provincia",
        "distrito",
        "slug",
      ],
      where: {
        slug: slug,
      },
    });
    if (empresaInfo) {
      return res.status(200).json(empresaInfo);
    } else {
      return res
        .status(400)
        .json({ message: "No se encontro el slug proporcionado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasEmpresas",
    });
  }
};

const getTodasEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({
      attributes: ["id", "nombre", "direccion", "slug"],
      order: [["nombre", "asc"]],
    });
    // solo id y nombre
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

const getMedicoListaPendientes = async (req, res) => {
  try {
    const medicosPendienteAprobacion = await SolicitudesAprobacion.findAll({
      where: {
        empresaId: req.user.id,
        estado: "pendiente",
      },
    });
    return res.status(200).json(medicosPendienteAprobacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getMedicoListaPendientes",
    });
  }
};

const aprobarMedico = async (req, res) => {
  try {
    const medicoId = req.params.id;
    // TODO: el medico y hospital solo puede haber un registro es decir compose primary key
    // buscamos la solicitud que pertenece a mi empresa y este pendiente
    const solicitudMedicoPendiente = await SolicitudesAprobacion.findOne({
      where: {
        medicoId: medicoId,
        empresaId: req.user.id,
        estado: "pendiente",
      },
    });
    if (!solicitudMedicoPendiente) {
      return res.status(400).json({
        message: "No se encontro el medicoId proporcionado",
        detail: "aprobarMedico",
      });
    }
    // si existe ese medico con aprobacion pendiente
    await solicitudMedicoPendiente.update({
      estado: "aprobado",
    });
    await Medico.update(
      {
        // habia olvidado registrar el id de la empresa en el perfil del medico
        empresaId: req.user.id,
        aprobacion: true,
      },
      {
        where: {
          id: medicoId,
        },
      }
    );
    return res.status(201).json(solicitudMedicoPendiente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "approveMedico",
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
    // TODO: si otra empresa tiene nombre similar puede haber conflicto y necesitaria agregar numeros aleatorios
    const generatedSlug = slugify(given_name, { lower: true });
    const nuevaEmpresa = Empresa.create({
      email: email,
      nombre: given_name,
      slug: generatedSlug,
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
      nombre,
      ruc,
      direccion,
      telefono,
      contrasenia,
      departamento,
      provincia,
      distrito,
    } = req.body;
    // de estos campos no son requisitos, ruc, contrasenia porque se pueden actualizar mas adelante
    // la contrasenia puede servir para uso compartido ? evaluar si es factible agregar moderadores de empresa | contrasenia debe ser encriptada
    if (!direccion || !telefono || !departamento || !provincia || !distrito) {
      return res.status(400).json({
        message: "No proporcionaste los campos obligatorios",
        detail: "direccion, telefono, departamento, provincia, distrito",
      });
    }
    // si se actualiza el nombre actualizamos tambien el slug
    if (nombre) {
      const generatedSlug = slugify(nombre, { lower: true });
    }
    const updatedEmpresa = Empresa.update(
      {
        nombre: nombre || Empresa.nombre,
        ruc: ruc || Empresa.ruc, // If ruc is not present in req.body, use the current value in the database
        direccion: direccion || Empresa.direccion,
        telefono: telefono || Empresa.telefono,
        contrasenia: contrasenia || Empresa.contrasenia,
        departamento: departamento || Empresa.departamento,
        provincia: provincia || Empresa.provincia,
        distrito: distrito || Empresa.distrito,
        slug: generatedSlug,
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

const getEmpresasConFiltro = async (req, res) => {
  // select me.id, me."medicoId", m.nombre, m.apellidos, e.nombre from "medicoEspecialidad" me JOIN "especialidad" e ON e.id=me."especialidadId" JOIN "medico" m ON m.id=me."medicoId"
  // filtros de especialidad e ubicacion principalmente
  try {
    const { especialidad, departamento, provincia } = req.query;
    console.log({ especialidad, departamento, provincia });
    if (especialidad && departamento && provincia) {
      const result = await Empresa.findAll({
        attributes: ["id", "nombre", "email"],
        where: {
          [Op.and]: [
            {
              "$medico.medicoEspecialidad.especialidad.id$": especialidad,
            },
            {
              "$empresa.departamento$": departamento,
            },
            {
              "$empresa.provincia$": provincia,
            },
          ],
        },
        include: [
          {
            model: Medico,
            as: "medico",
            attributes: ["id", "nombre", "email"],
            include: {
              model: MedicoEspecialidad,
              as: "medicoEspecialidad",
              attributes: ["id", "precio"],
              include: {
                model: Especialidad,
                as: "especialidad",
              },
            },
          },
        ],
      });
      return res.status(200).json(result);
    } else if (especialidad && departamento) {
      const result = await Empresa.findAll({
        attributes: ["id", "nombre", "email"],
        where: {
          [Op.and]: [
            {
              "$medico.medicoEspecialidad.especialidad.id$": especialidad,
            },
            {
              "$empresa.departamento$": departamento,
            },
          ],
        },
        include: [
          {
            model: Medico,
            as: "medico",
            attributes: ["id", "nombre", "email"],
            include: {
              model: MedicoEspecialidad,
              as: "medicoEspecialidad",
              attributes: ["id", "precio"],
              include: {
                model: Especialidad,
                as: "especialidad",
              },
            },
          },
        ],
      });
      return res.status(200).json(result);
    } else if (especialidad && provincia && !departamento) {
      return res.status(500).json({
        message: "Si proporcionas provincia. Departamento es obligatorio",
      });
    } else if (especialidad && !provincia && !departamento) {
      // si solo buscan por especialidad
      const result = await Empresa.findAll({
        attributes: ["id", "nombre", "email"],
        where: {
          "$medico.medicoEspecialidad.especialidad.id$": especialidad,
        },
        include: [
          {
            model: Medico,
            as: "medico",
            attributes: ["id", "nombre", "email"],
            include: {
              model: MedicoEspecialidad,
              as: "medicoEspecialidad",
              attributes: ["id", "precio"],
              include: {
                model: Especialidad,
                as: "especialidad",
              },
            },
          },
        ],
      });
      return res.status(200).json(result);
    }
    // si llega hasta aca no cumplio ninguna de las anteriores condiciones
    // param vacio /
    const resultado = await Empresa.findAll();
    // const resultado = await Empresa.findAll({
    //   attributes: ["id", "nombre", "email"],
    //   include: {
    //     model: Medico,
    //     attributes: ["id", "nombre", "email"],
    //     include: {
    //       model: MedicoEspecialidad,
    //       attributes: ["id", "precio"],
    //       // where: {
    //       //   precio: 50.0,
    //       // },
    //       include: {
    //         model: Especialidad,
    //         where: {
    //           id: 2,
    //           // nombre:{
    //           //   [Op.iLike]: '%Derma%',
    //           // }
    //         },
    //       },
    //       required: true,
    //     },
    //     required: true,
    //   },
    // });
    return res.status(200).json(resultado);
    // Para acceder a los datos, utiliza resultado.toJSON()
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getEmpresasConFiltro",
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
  getMedicoListaPendientes,
  aprobarMedico,
  getEmpresasConFiltro,
  getEmpresaInfoPorSlug,
  getEmpresaEspecialidadesPorFiltro,
  getAllEspecialidadesEmpresaPorId,
};
