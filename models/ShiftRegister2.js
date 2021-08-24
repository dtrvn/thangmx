const mongoose = require("mongoose");

const ShiftRegister2Schema = new mongoose.Schema({
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
  register: [
    {
      shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shift",
      },
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
      date: {
        type: Date,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = ShiftRegister = mongoose.model(
  "shiftRegister2",
  ShiftRegister2Schema
);
