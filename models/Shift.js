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
  time: {
    type: String,
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branch",
  },
  position: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = Shift = mongoose.model("shift", ShiftSchema);
