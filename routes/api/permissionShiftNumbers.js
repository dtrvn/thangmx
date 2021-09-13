const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Branch = require("../../models/PermissionShiftNumber");

// @route       POST api/permissionShiftNumber
// @desc        Create or Update Permission Shift Number
// @access      Private
router.post(
  "/",
  auth,
  async (req, res) => {

    const { id, branchId, shiftNoPermit } = req.body;
    
    const fieldAddUpdate = {};
    if (id) fieldAddUpdate.id = id;
    fieldAddUpdate.branchId = branchId;
    fieldAddUpdate.shiftNoPermit = shiftNoPermit;

    try {
      let permitShift = await PermissionShiftNumber.findOne({ branchId });

      if (id) {
        // Update
        permitShift = await PermissionShiftNumber.findOneAndUpdate(
          { _id: id },
          { $set: fieldAddUpdate },
          { new: true }
        );
        return res.json(permitShift);
      }

      if (permitShift) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Permission Shift Number already exists" }] });
      }

      // Create
      permitShift = new PermissionShiftNumber({
        branchId,
        shiftNoPermit,
      });

      await permitShift.save();

      res.json(permitShift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/permissionShiftNumbers
// @desc        Get all Permission Shift Number
// @access      Public
router.get("/", async (req, res) => {
  try {
    const permitShifts = await PermissionShiftNumber.find();
    res.json(permitShifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/permissionShiftNumbers/:id
// @desc        Get Permission Shift Number by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const permitShift = await PermissionShiftNumber.findById(req.params.id);

    if (!permitShift) {
      return res.status(404).json({ msg: "Permission Shift Number not found" });
    }

    res.json(permitShift);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Permission Shift Number not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/permissionShiftNumbers/:id
// @desc        Delete a permission Shift Number
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const permitShift = await PermissionShiftNumber.findById(req.params.id);

    if (!permitShift) {
      return res.status(404).json({ msg: "Permission Shift Number not found" });
    }

    await permitShift.remove();

    res.json({ msg: "Permission Shift Number removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Permission Shift Number not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
