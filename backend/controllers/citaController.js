const { Op } = require("sequelize");
const Cita = require("../models/cita");
const Horario = require("../models/horario");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const moment = require("moment");
const Especialidad = require("../models/especialidad");

const getTodasCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getTodasCitas",
    });
  }
};
const postCitaNueva = async (req, res) => {
  try {
    // TODO: validar todos los campos
    const pacienteId = req.user.id;
    // entrada fecha formato "DD-MM-YYYY"
    const { medicoEspecialidadId, fecha, hora } = req.body;
    const formatoActual = "DD-MM-YYYY";
    let diaFecha = moment(fecha, formatoActual).day();
    // modificamos si es 0 moment js empieza en Domingo 0, Lunes 1
    if (diaFecha === 0) {
      diaFecha = 7;
    }
    diaFecha = `${diaFecha}`;

    const horaMoment = moment(hora, "HH:mm");
    const fechaMoment = moment(fecha, "DD-MM-YYYY");
    const medicoEspecialidad = await MedicoEspecialidad.findByPk(
      medicoEspecialidadId
    );
    console.log(medicoEspecialidad.medicoId);
    console.log(medicoEspecialidad.especialidadId);
    console.log({
      fecha: fechaMoment.format("YYYY-MM-DD"),
      hora: horaMoment.format("HH:mm"),
      medicoId: medicoEspecialidad.medicoId,
      especialidadId: medicoEspecialidad.especialidadId,
      [Op.or]: [{ estado: "pendiente" }, { estado: "confirmada" }],
    });
    if (!medicoEspecialidad) {
      return res
        .status(400)
        .json({ message: "Datos proporcionados incorrectos" });
    }
    // esta corroborracion para evitar gasto de recursos
    const existeCitaEnElPuesto = await Cita.findOne({
      where: {
        fecha: fechaMoment.format("YYYY-MM-DD"),
        hora: horaMoment.format("HH:mm"),
        medicoId: medicoEspecialidad.medicoId,
        especialidadId: medicoEspecialidad.especialidadId,
        [Op.or]: [{ estado: "pendiente" }, { estado: "confirmada" }],
      },
    });
    console.log("-=---------------- EXISTE O NO __________________");
    console.log(existeCitaEnElPuesto);
    if (existeCitaEnElPuesto !== null && existeCitaEnElPuesto !== {}) {
      return res.status(400).json({
        message: `Existe ya una cita sacada con fecha ${fecha} - ${hora} `,
        existeCitaEnElPuesto,
      });
    }
    // se supone aca que el cl tiene medicoEspecialidadId y ya sabe con que medico y especialidad va a sacar cita
    horariosRaw = await Horario.findAll({
      attributes: [
        "medicoEspecialidadId",
        "diaSemana",
        "horaInicio",
        "horaFin",
      ],
      where: {
        medicoEspecialidadId: medicoEspecialidadId,
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
    let estaEnRango = false;
    horariosRaw.map((horario) => {
      let horaInicio = moment(horario.horaInicio, "HH:mm");
      let horaFin = moment(horario.horaFin, "HH:mm");
      if (horaMoment.isBetween(horaInicio, horaFin)) {
        estaEnRango = true;
      }
    });
    if (estaEnRango) {
      const isMultipleOf30 = horaMoment.minute() % 30 === 0;
      if (!isMultipleOf30) {
        return res.status(400).json({
          message:
            "Las fechas deben estar en intervalos de 30min. Intenta de nuevo",
        });
      }
      const nuevaCita = await Cita.create({
        medicoId: medicoEspecialidad.medicoId,
        pacienteId: pacienteId,
        especialidadId: medicoEspecialidad.especialidadId,
        fecha: fechaMoment.format("YYYY-MM-DD"),
        hora: horaMoment.format("HH:mm"),
      });
      return res.status(201).json({
        message: `Se ha creado cita para usuario ${pacienteId} y fecha ${fecha} - ${hora}`,
        cita: "nuevaCita",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "postCitaNueva",
    });
  }
};

// select c.id, CONCAT(med.nombre,' ',med.apellidos) as medico, p.nombre as paciente, e.nombre as especialidad, c.fecha, c.hora from cita c JOIN medico med ON med.id=c."medicoId" JOIN paciente p ON p.id=c."pacienteId" JOIN especialidad e ON e.id=c."especialidadId";

module.exports = {
  getTodasCitas,
  postCitaNueva,
};
