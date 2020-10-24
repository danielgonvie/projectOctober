const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: String,
    content: [{message: String, owner: String}]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
