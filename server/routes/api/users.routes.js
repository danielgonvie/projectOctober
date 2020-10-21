const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// Get all users
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Get a specific user
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
});

//Edit a especific user
router.put("/edit/:id", (req, res, next) => {
  const name = req.body.name;


  User.findOneAndUpdate(req.params.id, { name: name})
    .then(user => {
      User.findById(user._id).then(user => {
        res.status(200).json(user);
      });
      console.log("User has been updated successfully");
    })
    .catch(error => console.log("Ha sucedido algo malo" + error));
});

//Create a new user
router.post("/new", (req, res, next) => {
  User.create({
    name: req.body.name,

  })
    .then(user => {
      console.log("User has been created successfully");
      res.json(user);
    })
    .catch(function() {
      next();
      throw new Error("Something went worng!");
    });
});

//Delete user
router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(user => {
      console.log("User has been deleted successfully");
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
});

module.exports = router;
