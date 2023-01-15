import { Message } from "@prisma/client";
import http from "http";
import app from "./app";
require("dotenv").config();
const socketio = require("socket.io");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socketio(server);

io.on("connection", (socket: any) => {
  console.log("New socket connection");

  // Socket to display new messages when they are sent
  socket.on("join chat room", (chatId: number) => {
    console.log(`New user in room n°${chatId}`);
    socket.join(chatId);
  });
  socket.on("leave chat room", (chatId: number) => {
    console.log(`User leaving room n°${chatId}`);
    socket.leave(chatId);
  });
  socket.on("send message", (message: any, chatId: number) => {
    console.log(`New message in room n°${chatId}`);
    io.to(chatId).emit("new message", message);
  });

  // Socket to display new chats when they are created
  socket.on("create user socket", (userId: number) => {
    console.log(`Create socket for user n°${userId}`);
    socket.join(userId);
  });
  socket.on("remove user socket", (userId: number) => {
    console.log(`Remove socket for user n°${userId}`);
    socket.leave(userId);
  });
  socket.on("new chat", (userId: number, chatId: number) => {
    console.log(`New chat for user n°${userId}`);
    io.to(userId).emit("new chat", chatId);
  });
  socket.on("delete chat", (userId: number, chatId: number) => {
    console.log(`Delete chat for user n°${userId}`);
    io.to(userId).emit("delete chat", chatId);
  });
  // socket.on("update timestamp", (userId: number, timestamp: string) => {
  //   console.log(`Timestamp to update : ${timestamp}`);
  //   io.to(userId).emit("update timestamp", timestamp);
  // });
});

