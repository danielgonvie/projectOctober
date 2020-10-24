const express = require("express");
const router = express.Router();

const Message = require("../../models/Message");
const Room = require("../../models/Room");

// Get all rooms
router.get("/", (req, res, next) => {
  Room.find()
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Get all messages in one specific room
router.get("/:roomId", (req, res, next) => {
  console.log(req.params.roomId , "aburiio")
  Room.findById(req.params.roomId)
    .then(room => {
      console.log(room, "lmao")
      res.status(200).json(room);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

//Send a new message
router.post("/sendMessage/:roomId", (req, res, next) => {
  Message.create({
    message: req.body.message,

  })
    .then(message => {
      console.log("Message has been sended successfully");
      res.json(message);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});


module.exports = router;
