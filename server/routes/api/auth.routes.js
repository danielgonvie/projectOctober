const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    res.status(400).json({ message: "All fields must be filled!" });
    return;
  }

  if (password.length < 4) {
    res
      .status(400)
      .json({ message: "Password must have at least 4 characters" });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong! Try again" });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({ message: "Ups! Something went wrong :(" });
        return;
      }

      // Automatically log in user after sign up
      req.login(newUser, err => {
        if (err) {
          res
            .status(500)
            .json({
              message: "Autologgin failed. Please refresh and try to login"
            });
          return;
        }

        res.status(200).json(newUser);
      });
    });
  });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully!" });
});

module.exports = router;
