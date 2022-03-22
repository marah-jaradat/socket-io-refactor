"use strict";

const port = process.env.PORT || 3001;
const io = require("socket.io")(port);

const vend = io.of("/vendor");

// Global
io.on("connection", (socket) => {
  console.log("connected on hub", socket.id);

  socket.on("lets_fire", (payload) => {
    io.emit("newOrder");
  });

  socket.on("pickup", (payload) => {
    io.emit("pickup", payload);
  });

  socket.on("inTransit", (payload) => {
    io.emit("inTransit", payload);
  });

  socket.on("delivered", (payload) => {
    io.emit("delivered", payload);
  });
});

// namespaces

// vend.on("connect", (socket) => {
//   console.log("vendor listen");
//   socket.on("done", (payload) => {
//     vend.emit("vendor", payload);
//   });
// });
