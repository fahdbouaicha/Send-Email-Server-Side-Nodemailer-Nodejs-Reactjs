const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

//Import all routes
const emails = require("./routes/email");

app.use("/api/v1", emails);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
