import express from "express";
import { __dirname } from "./utils.js";
import ViewsRouter from "./routers/views/views.router.js";
import productsApiRouter from "./routers/api/products.router.js";
import cartsApiRouter from "./routers/api/carts.router.js";
import sessionsApiRouter from "./routers/api/sessions.router.js";
import handlebars from "express-handlebars";
import path from "path";
import MongoStore from "connect-mongo";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { URI } from "./db/mongodb.js";
import passport from "passport";
import initializePassport from "./config/passaport.js";

const SESSION_SECRET = "(7;m:<B9({]7WwrStbF£Jq:75X71K.e";

const app = express();

app.use(
  sessions({
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 120,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", ViewsRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/sessions", sessionsApiRouter);

app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;
