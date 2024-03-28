/** 
Routes Events / events
    host + /api/events
**/
// import router from api backend
const { Router } = require("express");

// function para la validacion de fechas
const { isDate } = require("../helpers/isDate");
// import validator from express
const { check } = require("express-validator");
// import json web token
const { jwtValidation } = require("../middlewares/validar-jwt");
// validation de filas en cada uno de los campos
const { fieldsValidation } = require("../middlewares/validation");

// import controllers
const {
  createEvent,
  updateEvent,
  deleteEvent,
  allEvents,
} = require("../controllers/events");

// almacenamos el router en una variable para su respectivo uso
const router = Router();

// todas las rutas tienen que pasar por la validacion del token
router.use(jwtValidation);

// PETICIONES

// events all
router.get("/", allEvents);

// create event
router.post(
  "/create",
  [
    check("title", "El titulo del evento es obligatorio").not().isEmpty(),
    check("notes", "Debes ingresar una descripcion del evento").not().isEmpty(),
    check("start", "Debes ingresar la fecha inicial del evento").custom(isDate),
    check("end", "Debes ingresar la fecha inicial del evento").custom(isDate),

    fieldsValidation,
  ],
  createEvent
);
// update event

router.put(
  "/:id",
  [
    check("title", "El titulo del evento es obligatorio").not().isEmpty(),
    check("notes", "Debes ingresar una descripcion del evento").not().isEmpty(),
    check("start", "Debes ingresar la fecha inicial del evento").custom(isDate),
    check("end", "Debes ingresar la fecha inicial del evento").custom(isDate),
    fieldsValidation,
  ],
  updateEvent
);
// remove event

router.delete("/:id", deleteEvent);

module.exports = router;
