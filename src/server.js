import http from "http";
import app from "./app.js";
import { init } from "./db/mongodb.js";
import { socketInit } from "./socket.js";
import config from "./config/config.js";

await init();

const server = http.createServer(app);

const httpServer = server.listen(config.port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${config.port}`);
});

socketInit(httpServer);
