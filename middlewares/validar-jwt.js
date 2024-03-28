// import jwt
const jwt = require("jsonwebtoken");
// realizamos la importacion de la response
const { response } = require("express");

// creamos una funcion y recibimos como props {req, res, next}
const jwtValidation = (req, res = response, next) => {
  // x-token header
  const token = req.header("x-token");

  // si no se encuentra el token enviamos un mensaje de error
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No se encontro ningun token en la peticion",
    });
  }
  // revisamos que no haya ningun error
  try {
    // generamos el token con la libreria de json web token
    // nos traemos los datos del usuario
    const { uid, name } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    // asignamos los datos en la request
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido para autenticarse",
    });
  }
  next();
};

// export functions
module.exports = {
  jwtValidation,
};
