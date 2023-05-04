const validarCamposRequeridos = (objeto, camposRequeridos) => {
  const restantes = camposRequeridos.filter((c) => !(c in objeto));
  if (restantes.length > 0) {
    // EJEMPLO: id, precio
    return restantes.join(", ");
  }
  return null;
};

module.exports = validarCamposRequeridos;
