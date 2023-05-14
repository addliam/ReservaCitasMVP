const generarDiaMesSemana = (
  numInicio: number,
  diaSemanaInicial: number,
  numFin: number
) => {
  const out = [];
  let diasem = diaSemanaInicial;
  for (let i = numInicio; i <= numFin; i++) {
    const value = { diaMes: i, diaSemana: diasem };
    out.push(value);
    if (diasem == 7) {
      // reset
      diasem = 1;
    } else {
      diasem += 1;
    }
  }
  return out;
};
export default generarDiaMesSemana;
