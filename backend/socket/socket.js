// import {Server} from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin:['https://chatapplication-x3ju.onrender.com'],
//         methods:['GET', 'POST'],
//     },
// });

// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
//  }

// const userSocketMap = {}; // {userId->socketId}


// io.on('connection', (socket)=>{
//     console.log("user connected",socket.id)
//     const userId = socket.handshake.query.userId
//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id;
//     } 
//      io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         console.log("user disconnectred",socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers',Object.keys(userSocketMap));
//     }) 

// })

// //     io.emit('getOnlineUsers',Object.keys(userSocketMap));

// //     socket.on('disconnect', ()=>{
// //         delete userSocketMap[userId];
// //         io.emit('getOnlineUsers',Object.keys(userSocketMap));
// //     })

// // })

// export {app, io, server};
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chatapplication-x3ju.onrender.com"], // your frontend
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // { userId: socketId }

// Get socketId for a given userId
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// ✅ Socket connection handling
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Listen for a message from sender
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    console.log(`📩 Message from ${senderId} to ${receiverId}:`, message);

    const receiverSocketId = userSocketMap[receiverId];

    // Emit message to receiver in real-time
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId,
        message,
      });
    }

    // (Optional) also emit back to sender for instant UI update
    io.to(socket.id).emit("newMessage", {
      senderId,
      message,
    });
  });

  // ✅ Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

