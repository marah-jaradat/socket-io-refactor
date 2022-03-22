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

  socket.on("pickup", (storeName) => {
    let obj = {
      event: "pickup",
      time: new Date().toString(),
      payload: storeName,
    };

    console.log("EVENT", obj);
    io.emit("pickup", storeName);
  });
  socket.on("in-transit", (storeName) => {
    let obj = {
      event: "in-transit",
      time: new Date().toString(),
      payload: storeName,
    };
    console.log("EVENT", obj);
  });
  socket.on("delivered", (storeName) => {
    let obj = {
      event: "delivered",
      time: new Date().toString(),
      payload: storeName,
    };

    console.log("EVENT", obj);
    io.emit("delivered", storeName);
  });
});

// namespaces

// vend.on("connect", (socket) => {
//   console.log("vendor listen");
//   socket.on("done", (payload) => {
//     vend.emit("vendor", payload);
//   });
// });
