const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB connection established");
  } catch (error) {
    throw new Error(`error connecting to Mongoose DB, error is: ${error}`);
  }
};

// export functions

module.exports = {
  dbConnection,
};
