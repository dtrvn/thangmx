const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Branch = mongoose.model("branch", BranchSchema);
