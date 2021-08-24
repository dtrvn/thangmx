const mongoose = require("mongoose");

const ShiftRegisterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branch",
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
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = ShiftRegister = mongoose.model(
  "shiftRegister",
  ShiftRegisterSchema
);
