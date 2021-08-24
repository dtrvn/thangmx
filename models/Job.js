const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  jobCost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Job = mongoose.model("job", JobSchema);
