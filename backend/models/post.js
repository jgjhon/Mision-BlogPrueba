const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  summary: {type: String},
  content: {type: String, required: true},
  imageUrl: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true},//para relacionar dos colecciones
});

module.exports = mongoose.model("Post",postSchema);
