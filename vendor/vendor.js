"use strict";

const socket = require("socket.io-client");
const PORT = process.env.PORT || 3001;
const host = `http://localhost:${PORT}`;
const { faker } = require("@faker-js/faker");

const hubConnection = socket.connect(host);

setInterval(() => {
  let storeName = {
    store: "my store",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  hubConnection.emit("pickup", storeName);
}, 5000);

hubConnection.on("delivered", (storeName) => {
  console.log(`VENDOR : Thank you for delivering ${storeName.orderID}`);
});
