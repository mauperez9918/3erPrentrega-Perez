import http from "http";
import app from "./app.js";
import { init } from "./db/mongodb.js";
import { socketInit } from "./socket.js";

await init();

const server = http.createServer(app);

const PORT = 8080;

const httpServer = server.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
});

socketInit(httpServer);
