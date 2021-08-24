const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const ShiftManager = require("../../models/ShiftManager");

// @route       POST api/shiftManagers
// @desc        Create or Update ShiftManagers
// @access      Private
router.post(
  "/",
  auth,
  [
    body("dateFrom", "Date From is required").not().isEmpty(),
    body("dateTo", "Date To is required").not().isEmpty(),
    body("date", "Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, dateFrom, dateTo, date, userId, branchId } = req.body;

    const shiftManagerField = {};
    if (id) shiftManagerField.id = id;
    shiftManagerField.dateFrom = dateFrom;
    shiftManagerField.dateTo = dateTo;
    shiftManagerField.date = date;
    shiftManagerField.userId = userId;
    shiftManagerField.branchId = branchId;

    try {
      let shiftManager = await ShiftManager.findOne({
        $and: [
          { dateFrom: dateFrom },
          { dateTo: dateTo },
          { userId: userId },
          { branchId: branchId },
        ],
      });

      if (id) {
        // Update
        shiftManager = await ShiftManager.findOneAndUpdate(
          { _id: id },
          { $set: shiftManagerField },
          { new: true }
        );
        return res.json(shiftManager);
      }

      if (!shiftManager) {
        shiftManager = null;
      }

      if (shiftManager) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Shift Manager already exists" }] });
      }

      // Create
      shiftManager = new ShiftManager({
        dateFrom,
        dateTo,
        date,
        userId,
        branchId,
      });

      await shiftManager.save();

      res.json(shiftManager);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/shiftManagers
// @desc        Get all Shift Manager
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shiftManager = await ShiftManager.find();
    res.json(shiftManager);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftManagers/:id
// @desc        Get Shift Manager by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const shiftManager = await ShiftManager.findById(req.params.id);

    if (!shiftManager) {
      return res.status(404).json({ msg: "Shift Manager not found" });
    }

    res.json(shiftManager);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Manager not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/shiftManager/:id
// @desc        Delete a Shift Manager
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const shiftManager = await ShiftManager.findById(req.params.id);

    if (!shiftManager) {
      return res.status(404).json({ msg: "Shift not found" });
    }

    await shiftManager.remove();

    res.json({ msg: "Shift Manager removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Manager not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
