const mongoose = require("mongoose");

const ShiftForWeekSchema = new mongoose.Schema({
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shift: [
    {
      shiftName: {
        type: String,
        required: true,
      },
      shiftTime: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      personNumber: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = ShiftForWeek = mongoose.model("shiftForWeek", ShiftForWeekSchema);
