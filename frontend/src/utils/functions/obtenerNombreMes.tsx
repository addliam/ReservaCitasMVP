const obtenerNombreMes = (numeroMes: number) => {
  const fecha = new Date(2000, numeroMes - 1, 1);
  return fecha.toLocaleString("es-ES", { month: "long" });
};
export default obtenerNombreMes;
