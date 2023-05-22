const { Op } = require("sequelize");
const Cita = require("../models/cita");
const Horario = require("../models/horario");
const MedicoEspecialidad = require("../models/medicoEspecialidad");
const moment = require("moment");
const Especialidad = require("../models/especialidad");
const Medico = require("../models/medico");
const Empresa = require("../models/empresa");

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

const getHistorialCitasPaciente = async (req, res) => {
  try {
    const pacienteId = req.user.id;
    const data = await Cita.findAll({
      attributes: ["id", "fecha", "hora"],
      where: {
        pacienteId: pacienteId,
      },
      include: [
        {
          model: Medico,
          as: "medico",
          attributes: ["id", "nombre", "apellidos"],
          include: {
            model: Empresa,
            as: "empresa",
            attributes: ["id", "nombre"],
          },
        },
        {
          model: Especialidad,
          as: "especialidad",
          attributes: ["id", "nombre"],
        },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "getHistorialCitasPaciente",
    });
  }
};

const postCitaConMespFechaHora = async (req, res) => {
  try {
    const pacienteId = req.user.id;
    // TODO: validar formato fecha
    const { medicoEspecialidadId, fecha, hora } = req.body;
    // validacion de medicoEspecialidaId
    const mesp = await MedicoEspecialidad.findByPk(medicoEspecialidadId);
    if (!mesp) {
      return res.status(400).json({ message: "Datos incorrectos." });
    }
    // que la hora sea en intervalo de 30min :00 :30
    const mins = hora.split(":")[1];
    const esMultiplo30 = mins === "30" || mins === "00";
    if (!esMultiplo30) {
      return res.status(400).json({ message: "Datos incorrectos." });
    }
    // que la fecha hora este dentro de horario del medicoEspecialidad
    // saber que numero de dia es la fecha. i.e. Lunes 1, Martes 2, Miercoles 3
    const weekDay = moment(fecha).weekday(); // 17/05 -> 3
    // obtener horarios de ese dia
    let horariosRaw = await Horario.findAll({
      attributes: [
        "medicoEspecialidadId",
        "diaSemana",
        "horaInicio",
        "horaFin",
      ],
      where: {
        diaSemana: weekDay,
        medicoEspecialidadId: medicoEspecialidadId,
      },
    });
    // TODO: hay un problema los rangos de fecha en horario incluyen la ultima hora.
    // i.e. 08:00 - 12:00 en UI el cl puede sacar cita a las 12:00 pero en ddbb no se podria
    // ya que la comparacion between daria Falso. Podemos agregarle 1min al fin, pero ademas
    // en la interfaz de medico al agregar horario habria q indicar que es inclusivo
    let i = 0;
    let estaEnRango = false;
    while (i < horariosRaw.length) {
      let horarios = horariosRaw[i];
      let inicio = moment(horarios.horaInicio, "HH:mm");
      // descontamos 1 min para que nos deje
      inicio = inicio.subtract(1, "minutes");
      let fin = moment(horarios.horaFin, "HH:mm");
      if (moment(hora, "HH:mm").isBetween(inicio, fin)) {
        console.log({ inicio, fin });
        estaEnRango = true;
        break;
      }
      i++;
    }
    if (!estaEnRango) {
      return res.status(400).json({
        message: "La fecha no se encuentra dentro del horario del medico.",
      });
    }
    // comprobar que la nueva cita no se solape con alguna existente
    let fechaConsulta = moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
    let horaConsulta = moment(hora, "HH:mm").format("HH:mm");

    const existeCitaEnElPuesto = await Cita.findOne({
      where: {
        fecha: fechaConsulta,
        hora: horaConsulta,
        medicoId: mesp.medicoId,
        especialidadId: mesp.especialidadId,
        [Op.or]: [{ estado: "pendiente" }, { estado: "confirmada" }],
      },
    });
    if (existeCitaEnElPuesto) {
      return res.status(400).json({
        message: "Cita ya ocupada. Verifica los datos.",
      });
    }
    // finalmente luego de las validaciones, creamos el objeto nuevo
    const nuevaCita = await Cita.create({
      medicoId: mesp.medicoId,
      pacienteId: pacienteId,
      especialidadId: mesp.especialidadId,
      fecha: fechaConsulta,
      hora: horaConsulta,
      precio: mesp.precio,
      // TODO: poner pendiente, verificar via email y luego cambiar a confirmada
      estado: "confirmada",
    });
    return res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      detail: "postCitaConMespFechaHora",
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
  postCitaConMespFechaHora,
  getHistorialCitasPaciente,
};
