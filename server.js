const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const errorHandler = require("./middlewares/errorMid");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}))


app.use('/', require('./route/shop'))

app.use(errorHandler);

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
    app.listen(process.env.PORT);
  }
);
