const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorMid");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");
require("dotenv").config();

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_CONNECT,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// app.use((req, res, next) => {
//   if (!req.session.user._id) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// });

app.use("/", require("./route/shop"));

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   next();
// });

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
