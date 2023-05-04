const moment = require("moment");
const divideIntervalo = (horaInicio, horaFin) => {
  const intervalos = [];
  let actual = moment(horaInicio, "HH:mm:ss");
  const fin = moment(horaFin, "HH:mm:ss");

  while (actual < fin) {
    const siguiente = moment.min(moment(actual).add(30, "minutes"), fin);
    intervalos.push({
      horaInicio: actual.format("HH:mm:ss"),
      horaFin: siguiente.format("HH:mm:ss"),
    });
    actual = siguiente;
  }

  return intervalos;
};
module.exports = divideIntervalo;
