const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 8000;
const FileStore = require("session-file-store")(session);

const app = express();
var fileStoreOptions = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passportPath = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const passport = require("passport");

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passportPath.localLogin.initialize());
app.use(passportPath.localLogin.session());
app.use(passportPath.gitHubLogin.initialize());
app.use(passportPath.gitHubLogin.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log(`Session ID: `);
  console.log(req.sessionID);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
