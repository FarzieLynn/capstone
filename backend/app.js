const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const KnexSessionStore = require("connect-session-knex")(expressSession);
const knex = require("./db/dbConnection");
require("dotenv").config();

const app = express();

const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Sets up CORS policy
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

// Creates session cookies when user navigates to the app.
app.use(
  expressSession({
    name: "connect.sid",
    secret: process.env.SESSION_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 12, // Expires after 12 hours
    },
  })
);

// Imports and uses all of our route files.
const users = require("./routes/users");
const root = require("./routes/root");
const login = require("./routes/login");
const threads = require("./routes/threads");
const comments = require("./routes/threadComments");

app.use("/users", users);
app.use("/", root);
app.use("/login", login);
app.use("/threads", threads);
app.use('/comments', comments);

app.get("/", async (req, res) => {
  //console.log(req.cookies.access_token);
  res.json("API is up and running.");
});

module.exports = app;
