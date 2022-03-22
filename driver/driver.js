"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const host = `http://localhost:${PORT}`;

const io = require("socket.io-client");
const globalConnection = io.connect(host);

const pickup = (payload) => {
  let pickupEvent = {
    event: "pickup",
    time: new Date().toString(),
    payload: payload,
  };
  console.log("EVENT", pickupEvent);
  globalConnection.emit(` picking up  ${payload.orderId}`, pickupEvent);
  setTimeout(() => {
    globalConnection.emit("hub_inTtransit", pickupEvent.payload);
  }, 1000);
};

const inTtransit = (payload) => {
  let Event = {
    event: "in-transit",
    time: new Date().toString(),
    payload: payload,
  };
  console.log(statusOrder);
  hubConnection.emit("print_stauts_order", statusOrder);
  hubConnection.emit("print_stauts_order", EVENT);
  setTimeout(() => {
    hubConnection.emit("hub_delivered", EVENT.payload);
  }, 3000);
};

const delivered = (payload) => {
  let EVENT = {
    event: "delivered",
    time: new Date().toString(),
    payload: payload,
  };
  let statusOrder = `DRIVER: delivered up  ${payload.orderId}`;
  console.log(statusOrder);
  hubConnection.emit("print_stauts_order", statusOrder);
  hubConnection.emit("print_stauts_order", EVENT);
  hubConnection.emit("hub_Notification", payload);
};

globalConnection.on("pickup", pickup);
globalConnection.on("inTtransit", inTtransit);
globalConnection.on("delivered", delivered);
