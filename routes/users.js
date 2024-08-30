var express = require("express");
var router = express.Router();
const userModel = require("../models/user.schema");
const localStrategy = require("passport-local");
const passport = require("passport");
const { isLoggedIn } = require("../middlewares/auth.middleware");

passport.use(new localStrategy(userModel.authenticate()));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Backend-task | Signup" });
});

router.post("/signup", async (req, res, next) => {
  try {
    var { name, username, email, password } = req.body;
    await userModel.register({ name, username, email }, password);
    res.redirect("/users/signin");
  } catch (error) {
    next(error);
  }
});

router.get("/signin", (req, res, next) => {
  res.render("signin", { title: "Backend-task | Signin" });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
  }),
  (req, res) => {}
);

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "Backend-task | Profile", user: req.user });
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout(() => {
    res.redirect("/users/signin");
  });
});

module.exports = router;
