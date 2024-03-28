/*/
Rutas de Usuario / Auth
    host + /api/auth
*/
// import router from api backend
const { Router } = require("express");
// import validator from express
const { check } = require("express-validator");
// import validation fields
const { fieldsValidation } = require("../middlewares/validation");
// import controllers
const { createUser, loginUser, renewToken } = require("../controllers/auth");
// import jwtValidation
const { jwtValidation } = require("../middlewares/validar-jwt");

const router = Router();
// impors controllers
// * user register
router.post(
  "/create",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña debe ser al menos de 6 digitos").isLength({
      min: 6,
    }),
    fieldsValidation,
  ],
  createUser
);

//* user log in
router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña debe ser al menos de 6 digitos").isLength({
      min: 6,
    }),
  ],
  loginUser
);

//? Token remove
router.get("/renew", jwtValidation, renewToken);
// exportacion

module.exports = router;
