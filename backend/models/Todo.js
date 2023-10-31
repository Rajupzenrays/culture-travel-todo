const mongoose = require("mongoose");
const uuid = require("uuid");

const todoSchema = new mongoose.Schema({
  text: String,
  uuid: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
