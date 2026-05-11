const { Server } = require("socket.io");

const users = {};

const initSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // user join
    socket.on("join", (userId) => {
      users[userId] = socket.id;
    });

    // send message
    socket.on("sendMessage", (data) => {

      const { senderId, receiverId, text } = data;

      const receiverSocketId = users[receiverId];

      if (receiverSocketId) {

        io.to(receiverSocketId).emit("receiveMessage", {
          senderId,
          text,
          createdAt: new Date()
        });

      }

    });

    // notification
    socket.on("sendNotification", (data) => {

      const receiverSocketId = users[data.receiverId];

      if (receiverSocketId) {

        io.to(receiverSocketId).emit("newNotification", {
          message: data.message,
          createdAt: new Date()
        });

      }

    });

    // disconnect
    socket.on("disconnect", () => {

      console.log("User disconnected:", socket.id);

      for (const userId in users) {

        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }

      }

    });

  });

};

module.exports = initSocket;