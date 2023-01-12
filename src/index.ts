import http from 'http'
import app from './app'
require('dotenv').config()
const socketio = require('socket.io');

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})


const io = socketio(server);

// // When a new socket connection is established
// io.on('connection', (socket:any) => {
//   // Print a message to the console
//   console.log('New socket connection');

//   // // When the client sends a message
//   // socket.on('message', (message:string) => {
//   //   // Print the message to the console
//   //   console.log(`Received message: ${message}`);

//   //   // Send the message to all sockets
//   //   io.emit('message', message);
//   // });

//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });
// });

// io.on('connection', (socket: any) => {
//   socket.on('subscribe chats', (userId:string) => {
//     socket.join(userId)
//   })

//   socket.on('create chat', (userId:string) => {
//     socket.to(userId).emit('chat created')
//   })

//   socket.on('delete chat', (userId:string) => {
//     socket.to(userId).emit('chat deleted')
//   })

//   socket.on('add member', (userId:string) => {
//     socket.to(userId).emit('member added')
//   })

//   socket.on('leave group', (userId:string) => {
//     socket.to(userId).emit('member left')
//   })

//   socket.on('subscribe chat messages', (chatId:string) => {
//     socket.join(chatId)
//   })

//   socket.on('unsubscribe chat messages', (chatId:string) => {
//     socket.leave(chatId)
//   })

//   socket.on('send message', (chatId:string, message:string) => {
//     socket.to(chatId).emit('receive message', message)
//   })
// })