// import express
const { response } = require("express");
// import bcrypt
const bcrypt = require("bcryptjs");
// import model user
const User = require("../models/User");
// import function generate token
const { generateToken } = require("../helpers/jwt");

// create user controller
const createUser = async (req, res = response) => {
  // body request params
  const { email, password } = req.body;
  // manejamos el try and catch ante un posible error
  try {
    // validacion de datos
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }
    user = new User(req.body);

    // encriptacion de la contraseña
    const hashSalt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, hashSalt);

    // save user
    await user.save();
    const token = await generateToken(user.uid, user.name);

    // si no hay errores en la validacion entonces hacemos registro del usuario
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    // server response HTTP status code
    res.status(500).json({
      ok: false,
      msg: "Eror al momento de registrar los datos del usuario",
    });
    console.error(error);
  }
};

// login user controller
const loginUser = async (req, res = response) => {
  // body request params
  const { email, password } = req.body;

  try {
    // validacion de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Error de credenciales, por favor intentelo nuevamente...",
      });
    }

    // confirm passwords
    const hashPassword = bcrypt.compareSync(password, user.password);
    if (!hashPassword) {
      return res.status(400).json({
        ok: true,
        msg: "Error de credenciales, por favor intentelo nuevamente...",
      });
    }

    // JSON WEB TOKEN

    const token = await generateToken(user.uid, user.name);
    res.json({
      ok: true,
      msg: "user login!",
      uid: user.id,
      email,
      name: user.name,
      token,
    });
  } catch (error) {
    // server response HTTP status code
    res.status(500).json({
      ok: false,
      msg: "Eror al momento de iniciar sesion",
    });
    console.error(error);
  }
};

// renew token controller

const renewToken = async (req, res = response) => {
  // extraemos los datos del usuario para generar un nuevo token
  const { uid, name } = req;

  // generamos un nuevo token para el usuario
  const token = await generateToken(uid, name);

  // enviamos el token al usuario en una respuesta
  res.json({
    msg: "renew token!",
    uid,
    name,
    token,
  });
};

// controllers exports

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
