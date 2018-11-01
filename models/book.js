const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  username: String,
  password: String,
  habit: String,
  dayCounter: Number,
  dailyStatus: Number
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
