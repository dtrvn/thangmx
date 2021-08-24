const mongoose = require("mongoose");

const ShiftManagerSchema = new mongoose.Schema({
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
  },
});

module.exports = ShiftManager = mongoose.model(
  "shiftManager",
  ShiftManagerSchema
);
