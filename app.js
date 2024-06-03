const express = require("express");
const morgan = require("morgan");

const errorController = require("./controllers/errorController");
const router = require("./routes");
const cors = require("cors");

const app = express();

// Using middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.use(router);

app.use(errorController.onLost);
app.use(errorController.onError);

module.exports = app;
