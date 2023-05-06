const jwt = require("jsonwebtoken");
const Medico = require("../models/medico");
const SolicitudesAprobacion = require("../models/solicitudesAprobacion");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const validarCamposRequeridos = require("../utils/validarCamposRequeridos");
const Especialidad = require("../models/especialidad");
const Cita = require("../models/cita");
const Horario = require("../models/horario");
const moment = require("moment");
const divideIntervalo = require("../utils/divideIntervalo");
const { Op } = require("sequelize");
const Paciente = require("../models/paciente");
const Empresa = require("../models/empresa");

const getTodosMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    return res.status(200).json(medicos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosMedicos",
    });
  }
};

const updateMedicoInfo = async (req, res) => {
  try {
    // no se puede actualizar la empresa libremente, todo: una lista de empresas que aprobaron como trabajador y poder retirarse de una empresa
    const { nombre, apellidos } = req.body;
    const updatedMedico = Medico.update(
      {
        nombre,
        apellidos,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    return res
      .status(201)
      .json({ message: "Informacion del medico actualizada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosMedicos",
    });
  }
};

const getMedicoPerfil = async (req, res) => {
  try {
    const { id } = req.user;
    const medicoPerfil = await Medico.findByPk(id, {
      include: {
        model: Empresa,
        as: "empresa",
        attributes: ["nombre"],
      },
      attributes: [
        "id",
        "nombre",
        "apellidos",
        "email",
        "aprobacion",
        "createdAt",
      ],
    });
    return res.status(200).json(medicoPerfil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosPacientes",
    });
  }
};

const solicitarAprobacionEmpresa = async (req, res) => {
  try {
    const empresaId = req.params.empresaId;
    const existeSolicitudPendiente = await SolicitudesAprobacion.findOne({
      where: {
        medicoId: req.user.id,
        empresaId: empresaId,
        estado: "pendiente",
      },
    });
    if (existeSolicitudPendiente) {
      return res.status(401).json({
        message: "Ya hay una solicitud en proceso pendiente.",
        solicitudId: existeSolicitudPendiente.id,
      });
    }
    const solicitudAprobacion = await SolicitudesAprobacion.create({
      medicoId: req.user.id,
      empresaId: empresaId,
      estado: "pendiente",
    });
    const resultado = {
      id: solicitudAprobacion.id,
      medicoId: solicitudAprobacion.medicoId,
      empresaId: solicitudAprobacion.empresaId,
      estado: solicitudAprobacion.estado,
    };
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "solicitarAprobacionEmpresa",
    });
  }
};

const getMedicoEspecialidades = async (req, res) => {
  try {
    const medicoEspecialidades = await MedicoEspecialidad.findAll({
      where: {
        medicoId: req.user.id,
      },
      attributes: ["id", "precio", "medicoId"],
      include: {
        model: Especialidad,
        as: "especialidad",
        attributes: ["id", "nombre"],
      },
    });
    return res.status(200).json(medicoEspecialidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getMedicoEspecialidades",
    });
  }
};

const getCitaConFiltro = async (req, res) => {
  try {
    const { estado } = req.query;
    if (!estado) {
      const todasMisCitas = await Cita.findAll({
        where: {
          medicoId: req.user.id,
        },
      });
      return res.status(200).json(todasMisCitas);
    }
    // TODO check si 'estado' esta dentro de lo q aceptamos antes de enviar un error generico
    const citas = await Cita.findAll({
      attributes: ["id", "fecha", "hora", "estado", "createdAt", "updatedAt"],
      where: {
        medicoId: req.user.id,
        estado: estado,
      },
      include: [
        {
          model: Paciente,
          as: "paciente",
          attributes: ["id", "nombre", "apellidos", "telefono"],
        },
        {
          model: Especialidad,
          as: "especialidad",
          attributes: ["id", "nombre"],
        },
      ],
    });
    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getCitaConFiltro",
    });
  }
};

const postEspecialidad = async (req, res) => {
  try {
    const { id, precio } = req.body;
    const faltantes = validarCamposRequeridos(req.body, ["id", "precio"]);
    if (faltantes) {
      return res.status(400).json({
        message: `Faltan los campos requeridos ${faltantes}`,
      });
    }
    const medicoEspecialidad = await MedicoEspecialidad.create({
      medicoId: req.user.id,
      especialidadId: id,
      precio: precio,
    });
    return res.status(201).json({
      id: medicoEspecialidad.id,
      medicoId: medicoEspecialidad.medicoId,
      especialidadId: medicoEspecialidad.especialidadId,
      precio: medicoEspecialidad.precio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "solicitarAprobacionEmpresa",
    });
  }
};

const updateEspecialidadPrecio = async (req, res) => {
  try {
    const { precio } = req.body;
    if (!precio) {
      return res.status(400).json({
        message: "El campo precio debe ser proporcionado",
      });
    }
    const especialidadId = req.params.id;
    const medicoEspecialidad = await MedicoEspecialidad.findByPk(
      especialidadId
    );
    if (!medicoEspecialidad) {
      return res.status(404).json({
        message: "No se encontro el id proporcionado",
        detail: "updateEspecialidadPrecio",
      });
    }
    // si existe la especialidad actualizamos el precio
    medicoEspecialidad.precio = precio;
    medicoEspecialidad.save();
    return res.status(201).json({
      id: medicoEspecialidad.id,
      medicoId: medicoEspecialidad.medicoId,
      especialidadId: medicoEspecialidad.especialidadId,
      precio: medicoEspecialidad.precio,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "updateEspecialidadPrecio",
    });
  }
};

const postMedico = async (req, res) => {
  try {
    const { email, given_name, family_name, sub } = req.payload;
    // para el MVP cambiaremos estado a aprobacion (aprobado quiere decir puede laborar agregar horarios y especialidades)
    // TODO: puede q un medico trabaje en varias empresas, evaluar muchos a muchos
    // TODO: puede haber otro path /login para no reducir el uso de esta ruta
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
      return res.status(409).json({
        message: "El email del medico ya se encuentra registrado",
        token: token,
      });
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
    return res.status(201).json({
      message: "Registro realizado con exito",
      token: tokenNuevoMedico,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "postMedico",
    });
  }
};

// GET /medicos/:id/horarios?fecha=:fecha&especialidad=:especialidad_id
const getHorarioDisponibleConFiltro = async (req, res) => {
  try {
    // se obliga a que se pase medicoId
    const medicoId = req.params.id;
    // el id de especialidad obvio y fecha formato "DD-MM-YYYY"
    const { fecha, especialidad } = req.query;
    // obtener el dia de cierta fecha con moment
    // Lunes 1, Martes 2, Miercoles 3 ...
    if (fecha) {
      let diaFecha = 0;
      const formatoActual = "DD-MM-YYYY";
      try {
        diaFecha = moment(fecha, formatoActual).day();
        // modificamos si es 0 moment js empieza en Domingo 0, Lunes 1
        if (diaFecha === 0) {
          diaFecha = 7;
        }
        // necesitamos pasar a string antes de la query
        diaFecha = `${diaFecha}`;
      } catch (error) {
        return res.status(400).json({
          message: `El formato debe fecha ser ${formato}.`,
        });
      }
      let medicoEspecialidad = [];
      if (especialidad) {
        // empleamos el dia de semana para consultar a la ddbb
        medicoEspecialidad = await MedicoEspecialidad.findAll({
          where: {
            "$medico.id$": medicoId,
            "$especialidad.id$": especialidad,
          },
          include: [
            {
              model: Medico,
              attributes: ["nombre", "apellidos"],
              as: "medico",
            },
            {
              model: Especialidad,
              attributes: ["id", "nombre"],
              as: "especialidad",
            },
          ],
        });
      } else {
        medicoEspecialidad = await MedicoEspecialidad.findAll({
          where: {
            "$medico.id$": medicoId,
          },
          include: [
            {
              model: Medico,
              attributes: ["nombre", "apellidos"],
              as: "medico",
            },
            {
              model: Especialidad,
              attributes: ["id", "nombre"],
              as: "especialidad",
            },
          ],
        });
      }
      // aca se asume consulta por horarios de solo un medico entonces hay varias especialidades
      let horariosRaw = [];
      if (especialidad) {
        horariosRaw = await Horario.findAll({
          attributes: [
            "medicoEspecialidadId",
            "diaSemana",
            "horaInicio",
            "horaFin",
          ],
          where: {
            "$medicoEspecialidad.medicoId$": medicoId,
            "$horario.diaSemana$": diaFecha,
            "$medicoEspecialidad.especialidad.id$": especialidad,
          },
          include: [
            {
              model: MedicoEspecialidad,
              as: "medicoEspecialidad",
              include: {
                model: Especialidad,
                as: "especialidad",
              },
            },
          ],
        });
      } else {
        horariosRaw = await Horario.findAll({
          attributes: [
            "medicoEspecialidadId",
            "diaSemana",
            "horaInicio",
            "horaFin",
          ],
          where: {
            "$medicoEspecialidad.medicoId$": medicoId,
            "$horario.diaSemana$": diaFecha,
          },
          include: [
            {
              model: MedicoEspecialidad,
              as: "medicoEspecialidad",
            },
          ],
        });
      }
      // obtener todas las citas que estan como pendientes o confirmadas para ese dia para luego excluirlas
      const citasUsadas = await Cita.findAll({
        where: {
          medicoId: medicoId,
          fecha: moment(fecha, formatoActual).format("YYYY-MM-DD"),
          [Op.or]: [{ estado: "pendiente" }, { estado: "confirmada" }],
        },
      });
      // obtiene las horas de las citas que ya estan tomadas
      const citasUsadasValues = citasUsadas.map((c) => c.hora);
      // [ '10:00:00' ]
      // iterar sobre horarios
      const horariosEvaluados = horariosRaw.map((horario) => {
        let intervalo = divideIntervalo(horario.horaInicio, horario.horaFin);
        // agregar un campo ocupado
        let intervaloEvaluado = intervalo.map((interv) => {
          return {
            horaInicio: interv.horaInicio,
            horaFin: interv.horaFin,
            medicoEspecialidadId: horario.medicoEspecialidadId,
            ocupado: citasUsadasValues.includes(interv.horaInicio),
          };
        });
        return intervaloEvaluado;
      });
      // const horarios = [];
      // quiza este sea el error [0]
      // horariosEvaluados[0].map((r) => horarios.push(r));
      return res
        .status(200)
        .json({ medicoEspecialidad, fecha, horarios: horariosEvaluados });
    }
    // caso base si no se proporciona ninguna query
    const horarios = await Horario.findAll({
      where: {
        "$medicoEspecialidad.medicoId$": medicoId,
      },
      include: {
        model: MedicoEspecialidad,
        as: "medicoEspecialidad",
      },
    });
    return res.status(200).json(horarios);
    ``` if (medico && especialidad) {
      const horarios = await Horario.findAll({
        where: {
          "$medicoEspecialidad.medicoId$": medico,
          "$medicoEspecialidad.especialidadId$": especialidad,
        },
        include: {
          model: MedicoEspecialidad,
          as: "medicoEspecialidad",
          required: true,
        },
      });
      return res.status(200).json(horarios);
    } else if (especialidad && !medico) {
      const horarios = await Horario.findAll({
        where: {
          "$medicoEspecialidad.especialidadId$": especialidad,
        },
        include: {
          model: MedicoEspecialidad,
          as: "medicoEspecialidad",
          required: true,
        },
      });
      return res.status(200).json(horarios);
    } else if (medico && !especialidad) {
      const horarios = await Horario.findAll({
        where: {
          "$medicoEspecialidad.medicoId$": medico,
        },
        include: {
          model: MedicoEspecialidad,
          as: "medicoEspecialidad",
          required: true,
        },
      });
      return res.status(200).json(horarios);
    }
    // si nada cumple esq no paso query asi que devolvemos todo
    const todosHorarios = await Horario.findAll({});
    return res.status(200).json(todosHorarios); ```;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodosHorarios",
    });
  }
};

module.exports = {
  getMedicoPerfil,
  getTodosMedicos,
  updateMedicoInfo,
  postMedico,
  solicitarAprobacionEmpresa,
  postEspecialidad,
  updateEspecialidadPrecio,
  getMedicoEspecialidades,
  getCitaConFiltro,
  getHorarioDisponibleConFiltro,
};
