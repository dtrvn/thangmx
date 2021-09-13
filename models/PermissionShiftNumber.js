const mongoose = require("mongoose");

const PermissionShiftNumberSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
    },
    shiftNoPermit: {
        type: Number,
        required: true,
    },
});

module.exports = PermissionShiftNumber = mongoose.model("permissionShiftNo", PermissionShiftNumberSchema);
