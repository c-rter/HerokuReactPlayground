const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  username: String,
  password: String,
  habit: String,
  dayCounter: Number,
  startDay: Number,
  habitStatus: String,
  rollingDay: Number
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;

/*     username: "carter",
    password: "password",
    habit: "test habit",
    dayCounter: 4,
    startDay: 180,
    habitStatus: "active",
    rollingDay: 184 */