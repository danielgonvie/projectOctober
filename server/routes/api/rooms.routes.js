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
  Room.findById(req.params.roomId)
    .then(room => {
      res.status(200).json(room);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

//Send a new message
router.post("/sendMessage/:roomId", (req, res, next) => {
  console.log(req.body)
  Message.create({
    message: req.body.message,
    owner: req.body.owner
  })
    .then(message => {
      Room.findByIdAndUpdate(req.params.roomId, { $push: { content: message}} )
       .then(room => {
        console.log(room);
        console.log("Message has been sended successfully");

        res.json(room);
       })

    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});


module.exports = router;
