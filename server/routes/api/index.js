const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./users.routes"));
router.use("/rooms", require("./rooms.routes"));
router.use("/songs", require("./songs.routes"));

module.exports = router;
