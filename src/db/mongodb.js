import mongoose from "mongoose";
import config from "../config/config.js";

export const URI =
  "mongodb+srv://developer:lNqVJnKBDXc7bTAt@cluster0.b2bk0bx.mongodb.net/ecommerce?retryWrites=true&w=majority";

export const init = async () => {
  try {
    mongoose.connect(config.mongoUrl);
    console.log("Base de datos conectada correctamente.");
  } catch (error) {
    console.error(
      `Ha ocurrido un error al intentar conectar la base de datos: ${error}`
    );
  }
};
