// import express
const { response } = require("express");
// import model events
const Event = require("../models/Event");
// create event controller
const createEvent = async (req, res = response) => {
  // la informacion que estamos enviando en la request se la pasamos al objeto del modelo
  const event = new Event(req.body);
  try {
    // almacenamos el id del usuario que viene en la request para posteriormente registrarlo
    event.user = req.uid;
    const eventRegister = await event.save();
    return res.status(201).json({
      ok: true,
      msg: "evento creado",
      event: eventRegister,
    });
  } catch (error) {
    // si hay algun error lo notificamos al usuario
    console.error(
      `Error al momento de crear un nuevo evento, el error es:${error}`
    );
    res.status(500).json({
      ok: false,
      msg: "Eror al momento de crear un nuevo evento",
    });
  }
};

// get all events controller
const allEvents = async (req, res = response) => {
  // obtenemos todos los eventos y tambien hacemos llamado
  //de los datos del usuario que creo ese evento mediante el metodo populate
  const events = await Event.find().populate("user", "name");
  try {
    return res.status(200).json({
      ok: true,
      msg: "todos los eventos",
      events,
    });
  } catch (error) {
    // si hay algun error lo notificamos al usuario
    console.error(
      `Error al momento de obtener todos los eventos, el error es:${error}`
    );
    return res.status(500).json({
      ok: false,
      msg: "Eror al momento de obtener todos los eventos",
    });
  }
};

// update event controller
const updateEvent = async (req, res = response) => {
  // obtenemos el id del evento que se va actualizar mediante los parametros de la url de la ruta
  const eventId = req.params.id;
  // extraemos el id enviado en la request
  const uid = req.uid;
  try {
    // obtenemos el evento que se va actualizar mediante el metodo findById
    const event = await Event.findById(eventId);
    // si no existe el evento enviamos el mensaje de no encontrado al usuario
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "evento no encontrado",
      });
    }
    // verificamos si la persona que creo el evento es la misma que quiere actualizar el evento
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tienes permiso para actualizar este evento",
      });
    }
    // si es el mismo usuario almacemamos el body de la request
    // y el id del usuario para realizar la actualizacion
    const newEvent = {
      ...req.body,
      user: uid,
    };
    // mediante el metodo findByIdAndUpdate le pasamos el body del evento y el id en donde
    // vamos a realizar la actualizacion
    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      // si queremos que retorne el evento actualizado
      new: true,
    });
    // si todo sale bien
    if (updateEvent) {
      // server response HTTP status code
      return res.status(200).json({
        ok: true,
        msg: "actualizacion de evento exitoso",
        evento: updateEvent,
      });
    } else {
      return s.status(500).json({
        ok: false,
        msg: "error al momento de realizar la actualizacion del evento",
      });
    }
  } catch (error) {
    console.error(error);
    // server response HTTP status code
    res.status(500).json({
      ok: false,
      msg: "Eror al momento de actualizar el evento",
    });
  }
};

// delete event controller
const deleteEvent = async (req, res = response) => {
  // obtenemos el id del evento que se va actualizar mediante los parametros de la url de la ruta
  const eventIdDelete = await req.params.id;
  const uid = req.uid;
  try {
    // verificamos que exista ese id del evento
    const eventId = await Event.findById(eventIdDelete);
    // si no existe el evento enviamos el mensaje de no encontrado al usuario
    if (!eventId) {
      return res.status(404).json({
        ok: false,
        msg: "evento no encontrado",
      });
    }

    // verificamos si la persona que creo el evento es la misma que quiere actualizar el evento
    if (eventId.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tienes permiso para eliminar este evento",
      });
    }

    // borramos el evento
    await Event.findByIdAndDelete(eventIdDelete);
    // si todo sale bien

    // server response HTTP status code
    return res.status(200).json({
      ok: true,
      msg: "evento eliminado",
      evento: deleteEvent,
    });
  } catch (error) {
    console.error(`New Error at moment of delete event, error is: ${error}`);
    // server response HTTP status code
    res.status(500).json({
      ok: false,
      msg: "Eror al momento de eliminar el evento",
    });
  }
};

// controllers exports
module.exports = {
  createEvent,
  updateEvent,
  allEvents,
  deleteEvent,
};
