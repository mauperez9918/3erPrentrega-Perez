import { Server } from "socket.io";
import ProductsDao from "./dao/product.dao.js";
import MessageDao from "./dao/message.dao.js";

export const socketInit = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    console.log(`Nuevo cliente socket conectado ${socket.id}`);

    socket.emit("update-messages", await MessageDao.getMessages());

    socket.on("new-message", async (newMessage) => {
      await MessageDao.createMessage(newMessage);
      socketServer.emit("update-messages", await MessageDao.getMessages());
    });

    socket.emit("getProducts", await ProductsDao.get());

    socket.on("deleteProduct", async (id) => {
      await ProductsDao.deleteById(id);
      socket.emit("getProducts", await ProductsDao.get());
    });

    socket.on("addProduct", async (data) => {
      await ProductsDao.addProduct(data);

      socket.emit("getProducts", await ProductsDao.get());
    });
  });
};
