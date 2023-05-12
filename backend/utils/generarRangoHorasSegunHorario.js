const generarDetalleHoras = (arrayRangos) => {
  //   arrayRangos = [
  //     { id: 11, horaInicio: "08:00:00", horaFin: "12:00:00" },
  //     { id: 12, horaInicio: "14:00:00", horaFin: "16:00:00" },
  //   ];
  //   if (arrayRangos === []) return [];
  // POSIBLE OPTIMIZACION
  //   const getMinutesFromTimeString = (timeString) => {
  //     const [hours, minutes, seconds] = timeString.split(":").map(Number);
  //     return hours * 60 + minutes + seconds / 60;
  //   };
  let result = [];
  for (let h = 6; h <= 23 - 1; h++) {
    for (let m = 0; m < 60; m += 30) {
      const fecha = new Date(1970, 0, 1, h, m, 0);
      const fecha30 = new Date(1970, 0, 1, h, m, 0);
      fecha30.setMinutes(m + 30);
      let isInRango = false;
      for (const rango of arrayRangos) {
        const horaInicio = new Date(`1970-01-01T${rango.horaInicio}`);
        const horaFin = new Date(`1970-01-01T${rango.horaFin}`);
        if (fecha >= horaInicio && fecha <= horaFin) {
          isInRango = true;
          break;
        }
      }
      const hours = String(fecha.getHours()).padStart(2, "0");
      const minutes = String(fecha.getMinutes()).padStart(2, "0");
      const hoursPlus30Min = String(fecha30.getHours()).padStart(2, "0");
      const minutesPlus30Min = String(fecha30.getMinutes()).padStart(2, "0");
      const jsonData = {
        horaInicio: `${hours}:${minutes}`,
        horaFin: `${hoursPlus30Min}:${minutesPlus30Min}`,
        active: isInRango ? true : false,
      };
      result.push(jsonData);
    }
  }
  return result;
};

const generarRangoHorasSegunHorario = (data) => {
  const dict = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  data.forEach((item) => {
    const dia = item.diaSemana;
    const horario = {
      id: item.id,
      horaInicio: item.horaInicio,
      horaFin: item.horaFin,
    };
    dict[dia].push(horario);
  });
  console.log("RESULTADO");
  const output = [];

  Object.keys(dict).map((key) => {
    let rangos = dict[key];
    let detalle = generarDetalleHoras(rangos);
    let data = {
      diaSemana: key.toString(),
      horario: detalle,
    };
    output.push(data);
  });
  return output;
};
module.exports = { generarRangoHorasSegunHorario };
