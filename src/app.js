import express from "express";
import { __dirname } from "./utils.js";
import ViewsRouter from "./routers/views/views.router.js";
import productsApiRouter from "./routers/api/products.router.js";
import cartsApiRouter from "./routers/api/carts.router.js";
import handlebars from "express-handlebars";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", ViewsRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);

app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;
