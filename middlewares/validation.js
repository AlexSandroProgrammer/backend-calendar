const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidation = (req, res = response, next) => {
  // errors validation
  const errors = validationResult(req);

  // si hay errores en la validacion entonces no realizamos el registro de los datos
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  fieldsValidation,
};
