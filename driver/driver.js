"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const host = `http://localhost:${PORT}`;

const io = require("socket.io-client");
const hubConnection = io.connect(host);

hubConnection.on("pickup", (payload) => {
  console.log(`DRIVER : picked up ${payload.orderID} `);
  setTimeout(() => {
    capsConnection.emit("in-transit", payload);
    console.log("DRIVER : in-transit");
  }, 2000);
  setTimeout(() => {
    capsConnection.emit("delivered", payload);
    console.log(`DRIVER : delivered up ${payload.orderID}`);
  }, 3000);
});
