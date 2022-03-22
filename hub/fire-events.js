"use strict";

require("dotenv").config();
const io = require("socket.io-client");

const PORT = process.env.PORT || 3001;

const host = `http://localhost:${PORT}`;
const hubConnection = io.connect(host);
// const vendConnect = io.connect(`${host}/vendor`);
hubConnection.emit("lets_fire");
// vendConnect.emit("done");
