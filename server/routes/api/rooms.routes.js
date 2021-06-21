const express = require("express");
const router = express.Router();

const Message = require("../../models/Message");
const Room = require("../../models/Room");
const Song = require("../../models/Song");

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
router.put("/delete/:roomId", (req, res, next) => {
  const songs = req.body.songs;

  Room.findOneAndUpdate(req.params.roomId, { songs: songs })
    .then(room => {
      Room.findById(room._id).then(user => {
        res.status(200).json(user);
      });
      console.log("Room songs has been updated successfully");
    })
    .catch(error => console.log("Ha sucedido algo malo" + error));
});

// Add song from especific room
router.put("/add/:roomId", (req, res, next) => {
  const song = req.body.song;
  console.log(song, "que es esto pa")

    Song.create({
      videoId: song.videoId,
      requestedBy: song.requestedBy
    })
      .then(song => {
        Room.findByIdAndUpdate(req.params.roomId, { $push: { songs: song}} )
         .then(room => {
          Room.findById(room._id).then(user => {
            res.status(200).json(user);
          });
          console.log("Room songs has been updated successfully");
         })
  
      })
      .catch(error => {
        res.status(500).json({ message: "Something went wrong" });
      });
});

module.exports = router;
