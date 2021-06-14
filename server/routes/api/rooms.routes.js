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

// Get all info for one specific room
router.get("/:roomId", (req, res, next) => {
  Room.findById(req.params.roomId)
    .then(room => {
      res.status(200).json(room);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Send a new message
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

// Delete song from especific room
router.put("/delete/:id", (req, res, next) => {
  const songs = req.body.songs;

  Room.findOneAndUpdate(req.params.id, { songs: songs })
    .then(room => {
      Room.findById(room._id).then(user => {
        res.status(200).json(user);
      });
      console.log("Room songs has been updated successfully");
    })
    .catch(error => console.log("Ha sucedido algo malo" + error));
});

module.exports = router;
