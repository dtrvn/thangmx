const mongoose = require("mongoose");

const PersonInShiftSchema = new mongoose.Schema({
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
  personShift: [
    {
      shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shift",
      },
      personNumber: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = PersonInShift = mongoose.model(
  "personInShift",
  PersonInShiftSchema
);
