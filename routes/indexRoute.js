const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (req.user.role === "admin") {
    res.render("admin", {
      user: req.user,
    });
  } else {
    res.render("dashboard", {
      user: req.user,
    });
  }
});

module.exports = router;
