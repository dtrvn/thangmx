const mongoose = require("mongoose");

const ShiftRegisterManagerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branch",
  },
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
    required: true,
  }
});

module.exports = ShiftRegisterManager = mongoose.model(
  "shiftRegisterManager",
  ShiftRegisterManagerSchema
);
