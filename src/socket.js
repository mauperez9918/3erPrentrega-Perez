import { Server } from "socket.io";
import ProductManager from "./controllers/productController.js";
import MessageManager from "./controllers/messageController.js";

export const socketInit = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    console.log(`Nuevo cliente socket conectado ${socket.id}`);

    socket.emit("update-messages", await MessageManager.getMessages());

    socket.on("new-message", async (newMessage) => {
      await MessageManager.createMessage(newMessage);
      socketServer.emit("update-messages", await MessageManager.getMessages());
    });

    socket.emit("getProducts", await ProductManager.get());

    socket.on("deleteProduct", async (id) => {
      await ProductManager.deleteById(id);
      socket.emit("getProducts", await ProductManager.get());
    });

    socket.on("addProduct", async (data) => {
      await ProductManager.addProduct(data);

      socket.emit("getProducts", await ProductManager.get());
    });
  });
};
