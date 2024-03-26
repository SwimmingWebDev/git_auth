const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.localLogin.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get(
  "/github",
  passport.gitHubLogin.authenticate("github", { scope: ["profile"] })
);

router.get(
  "/github/callback",
  passport.gitHubLogin.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

module.exports = router;
