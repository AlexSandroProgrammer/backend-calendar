// importamos la libreria de json web token
const jwt = require("jsonwebtoken");

// creamos una funcion para generar el JSON WEB TOKEN

const generateToken = (uid, name) => {
  // realizamos el retorno de una promesa el cual dependiendo el estado lo resolvemos o devolvemos
  // el error de la promesa
  return new Promise((resolve, reject) => {
    // le pasamos el id del usuario y el nombre del usuario al payload
    const payload = { uid, name };

    // generamos el token con la libreria de json web token
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      // tiempo de expiracion del token
      {
        expiresIn: "2h",
      },
      // si hay algun error devolvemos el callback y si no entonces devolvemos el token
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error signing request with token: ");
        }
        resolve(token);
      }
    );
  });
};

// exports functions

module.exports = {
  generateToken,
};
