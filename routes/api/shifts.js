const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Shift = require("../../models/Shift");

// @route       POST api/shifts
// @desc        Create or Update Shift
// @access      Private
router.post(
  "/",
  auth,
  [
    body("shiftName", "Shift name is required").not().isEmpty(),
    body("shiftTime", "Shift Time is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, shiftName, shiftTime } = req.body;

    const shiftField = {};
    if (id) shiftField.id = id;
    shiftField.shiftName = shiftName;
    shiftField.shiftTime = shiftTime;

    try {
      let shift = await Shift.findOne({ shiftName });

      if (id) {
        // Update
        shift = await Shift.findOneAndUpdate(
          { _id: id },
          { $set: shiftField },
          { new: true }
        );
        return res.json(shift);
      }

      if (shift) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Shift already exists" }] });
      }

      // Create
      shift = new Shift({
        shiftName,
        shiftTime,
      });

      await shift.save();

      res.json(shift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/shift
// @desc        Get all Shifts
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shifts/:id
// @desc        Get Shift by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({ msg: "Shift not found" });
    }

    res.json(shift);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/shifts/:id
// @desc        Delete a Shift
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({ msg: "Shift not found" });
    }

    await shift.remove();

    res.json({ msg: "Shift removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
