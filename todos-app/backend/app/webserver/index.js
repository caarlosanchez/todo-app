"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { accountRouter, authRouter, todosRouter } = require("./routes/index");

const app = express();
app.use(cors());
// Hacer legible json
app.use(express.json());
// Hacer legible form-data
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/account", accountRouter);
app.use("/api/login", authRouter);
app.use("/api/todos", todosRouter);

let server = null;

async function listen(port) {
  try {
    if (server) {
      return server;
    }
    server = await app.listen(port);
    return server;
  } catch (e) {
    console.error("can't listen", e);
    throw e;
  }
}

module.exports = {
  listen,
};
