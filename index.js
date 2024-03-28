// importacion de express
const express = require("express");
// importacion de libreria para manejar las variables de entorno
require("dotenv").config();

// import cors
const cors = require("cors");
const { dbConnection } = require("./database/connection");

// crear el servidor de express
const app = express();

// llamamos la conexion a la base de datos
dbConnection();

// llamamos los cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

//* Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
