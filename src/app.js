import express from "express";
import { __dirname } from "./utils/utils.js";
import ViewsRouter from "./routers/views/views.router.js";
import productsApiRouter from "./routers/api/products.router.js";
import cartsApiRouter from "./routers/api/carts.router.js";
import authApiRouter from "./routers/api/auth.router.js";

import handlebars from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passaport.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { addLogger } from "./config/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto Backend CoderHouse",
      description:
        "Esta es la docuemntacion de mi proyecto para el curso de programación backend de Coderhouse.",
    },
  },
  apis: [path.join(__dirname, "docs", "**", "*.yaml")],
};

const specs = swaggerJSDoc(swaggerOpts);

app.use(addLogger);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

initializePassport();
app.use(passport.initialize());

app.use("/", ViewsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/auth", authApiRouter);
app.use(errorHandlerMiddleware);

export default app;
