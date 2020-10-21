require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cors = require("cors");

require("./configs/db.config");
require("./configs/passport.config");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

app.use(
  session({
    secret: "socket-app",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const index = require("./routes");
app.use("/", index);

const authRoutes = require("./routes/api/auth.routes");
app.use("/auth", authRoutes);

module.exports = app;
