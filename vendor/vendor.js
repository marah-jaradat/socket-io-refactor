"use strict";

require("dotenv").config();
const { faker } = require("@faker-js/faker");
const PORT = process.env.PORT || 3001;
const io = require("socket.io-client");
const host = `http://localhost:${PORT}/vendor`;
const hubConnection = io.connect(host);
// const vend = io.connect(host);

// vend.on("vendor", (payload) => {
//     console.log("vendor is here")
// })

setInterval(() => {
  let ordername = {
    store: "store name",
    orderId: faker.datatype.uuid(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };

  hubConnection.emit("pickup", ordername);
}, 5000);

hubConnection.on("delivered", (ordername) => {
  console.log(`vendor :Thank you for delivering ${ordername.orderId}`);
});
