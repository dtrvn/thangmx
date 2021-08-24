const mongoose = require("mongoose");

const NextWeekActiveSchema = new mongoose.Schema({
  startDateNextWeek: {
    type: Date,
    required: true,
  },
  endDateNextWeek: {
    type: Date,
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NextWeekActive = mongoose.model("nextWeekActive", NextWeekActiveSchema);
