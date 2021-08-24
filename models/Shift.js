const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
  shiftName: {
    type: String,
    required: true,
  },
  shiftTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Shift = mongoose.model("shift", ShiftSchema);
