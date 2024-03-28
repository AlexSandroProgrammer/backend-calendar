// importacion de moment para el manejo de las fechas
const moment = require("moment");

// creamos una funcion para recibir el value enviado en el check
const isDate = (value) => {
  // si no se encuentra el valor enviamos un mensaje de error
  if (!value) return false;
  // convertimos el valor enviado a moment
  const fecha = moment(value);
  // si la fecha es valida entonces retornmos un valor verdadero
  if (fecha.isValid()) {
    return true;
  } else {
    // si la fecha no es valida entonces retornamos un valor falso
    return false;
  }
};

module.exports = {
  isDate,
};
