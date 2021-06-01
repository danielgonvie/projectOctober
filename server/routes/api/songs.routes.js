const express = require("express");
const router = express.Router();

const Song = require("../../models/Song");

// Get all songs
router.get("/", (req, res, next) => {
  Song.find()
    .then(songs => {
      res.status(200).json(songs);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Send a new message
router.post("/addSong", (req, res, next) => {
  console.log(req.body)
  Song.create({
    message: req.body.videoId,
    owner: req.body.requestedBy
  })
    .then(song => {
        console.log("Song has been added successfully");

        res.json(song);
       })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

//Delete song
router.delete("/deleteSong/:id", (req, res, next) => {
  const { id } = req.params;
  Song.findByIdAndRemove(id)
    .then(song => {
      console.log("Song has been deleted successfully");
      res.status(200);
    })
    .catch(error => {
      console.log(error, "fue mal");
      res.status(500);
    });
});

module.exports = router;
