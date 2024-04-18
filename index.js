require("dotenv").config();
const DbConnection = require("./config/DbConnection");
const route = require("./routes");
const express = require("express");
const app = express();

app.use(express.json());
DbConnection();

app.listen(8000, function () {
  console.log("Server Is Running");
});

app.use(route);
