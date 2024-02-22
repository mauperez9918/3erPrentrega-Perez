import http from "http";
import app from "./app.js";
import { init } from "./db/mongodb.js";
import { socketInit } from "./socket.js";
import config from "./config/config.js";
import cluster from "cluster";
import { cpus } from "os";

if (cluster.isPrimary) {
  const cpuCount = cpus().length;
  console.log(`Soy el proceso primario y voy a crear ${cpuCount} workers`);
  for (let index = 0; index < cpuCount; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`El worker ${worker.process.pid} ha muerto`, code, signal);
    if (String(signal) == "SIGTERM") {
      cluster.fork();
    }
  });
} else {
  console.log("Soy un worker y voy a ejectuar la aplicacion.");
  await init();

  const server = http.createServer(app);

  const httpServer = server.listen(config.port, () => {
    console.log(
      `El servidor esta corriendo en el puerto: ${config.port} (${process.pid})`
    );
  });

  socketInit(httpServer);
}
