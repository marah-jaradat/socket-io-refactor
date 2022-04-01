"use strict";
const { faker } = require("@faker-js/faker");
const port = process.env.PORT || 3000;
const io = require("socket.io")(port);
const client = require("socket.io-client");

const host = "http://localhost:3000";
const fakeClient = client.connect(host);

let socketObj = {};
let storeName = {
  store: "my store",
  orderID: faker.datatype.uuid(),
  customer: faker.name.findName(),
  address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
};
describe("testing the connection ", () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  // beforeAll(() => {
  //     consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  // })
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("testing connection", async () => {
    io.emit("connection", socketObj);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe("testing hub", () => {
  let consoleSpy;
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });
  it("pickup test", async () => {
    io.emit("pickup", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("in-transit test", async () => {
    io.emit("in-transit", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("delivered test", async () => {
    io.emit("delivered", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe("testing the client side", () => {
  let consoleSpy;
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
    io.close();
  });
  it("pickup test", async () => {
    fakeClient.emit("pickup", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("in-transit test", async () => {
    fakeClient.emit("in-transit", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("delivered test", async () => {
    fakeClient.emit("delivered", storeName);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
