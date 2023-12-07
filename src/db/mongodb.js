import mongoose from "mongoose";

export const URI =
  "mongodb+srv://developer:WE6Vgb7amm3V3NwG@cluster0.b2bk0bx.mongodb.net/ecommerce?retryWrites=true&w=majority";

export const init = async () => {
  try {
    mongoose.connect(URI);
    console.log("Base de datos conectada correctamente.");
  } catch (error) {
    console.error(
      `Ha ocurrido un error al intentar conectar la base de datos: ${error}`
    );
  }
};
