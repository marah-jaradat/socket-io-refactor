"use strict";

require("dotenv").config();
const socket = require("socket.io-client");
const PORT = process.env.PORT || 3001;
const host = `http://localhost:${PORT}`;

const hubConnection = socket.connect(host);

hubConnection.on("pickup", (storeName) => {
  console.log(`DRIVER : picked up ${storeName.orderID} `);
  setTimeout(() => {
    hubConnection.emit("in-transit", storeName);
    console.log("DRIVER : in-transit");
  }, 2000);
  setTimeout(() => {
    hubConnection.emit("delivered", storeName);
    console.log(`DRIVER : delivered up ${storeName.orderID}`);
  }, 3000);
});
