const mongoose = require("mongoose");

const TypeUserSchema = new mongoose.Schema({
  typeUsername: {
    type: String,
    required: true,
  },
  typeUserPercentCost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TypeUser = mongoose.model("typeUser", TypeUserSchema);
