const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const ShiftRegister = require("../../models/ShiftRegister");

// @route       POST api/shiftRegisters
// @desc        Create or Update Shift Registers
// @access      Private
router.post("/", auth, async (req, res) => {
  const { id, userId, branchId } = req.body;

  try {
    let shiftRegister = await ShiftRegister.findOne({
      $and: [{ userId: userId }, { branchId: branchId }],
    });

    if (id) {
      // No Update
      return res.json(shiftRegister);
    }

    if (!shiftRegister) {
      shiftRegister = null;
    }

    if (shiftRegister) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Shift Register already exists" }] });
    }

    // Create
    shiftRegister = new ShiftRegister({
      userId,
      branchId,
    });

    await shiftRegister.save();

    res.json(shiftRegister);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route       GET api/shift
// @desc        Get all ShiftRegisters
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shiftRegisters = await ShiftRegister.find();
    res.json(shiftRegisters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegister/:branchId
// @desc        Get Shift Register by Branch ID
// @access      Private
router.get("/:branchId", auth, async (req, res) => {
  try {
    const branchId = req.params.branchId;

    const shiftRegister = await ShiftRegister.find({ branchId });

    if (!shiftRegister) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    res.json(shiftRegister);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegister/:branchId/:userId
// @desc        Get Shift Register by Branch ID and User ID
// @access      Private
router.get("/:branchId/:userId", auth, async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const userId = req.params.userId;

    const shiftRegister = await ShiftRegister.find({
      $and: [{ userId: userId }, { branchId: branchId }],
    });

    if (Object.keys(shiftRegister).length === 0) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    res.json(shiftRegister);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegister/:branchId/:userId
// @desc        Get Shift Register by Branch ID and User ID
// @access      Private
router.get("/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;

    const shiftRegister = await ShiftRegister.find({
      $and: [{ dateFrom: dateFrom }, { dateTo: dateTo}, { branchId: branchId }],
    });

    if (Object.keys(shiftRegister).length === 0) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    res.json(shiftRegister);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/shiftRegister/:id
// @desc        Delete a Shift Register
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const shiftRegister = await ShiftRegister.findById(req.params.id);

    if (!shiftRegister) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    await shiftRegister.remove();

    res.json({ msg: "Shift Register removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       PUT api/shiftRegisters/register
// @desc        Add Shift Registers
// @access      Private
router.put(
  "/register",
  [
    auth,
    [
      body("dateFrom", "Date From is required").not().isEmpty(),
      body("dateTo", "Date To is required").not().isEmpty(),
      body("date", "Date is required").not().isEmpty(),
      body("cost", "Cost is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      registerId,
      branchId,
      shiftId,
      jobId,
      dateFrom,
      dateTo,
      date,
      cost,
    } = req.body;

    const newRegister = {
      registerId,
      branchId,
      shiftId,
      jobId,
      dateFrom,
      dateTo,
      date,
      cost,
    };

    try {
      const shiftRegister = await ShiftRegister.findOne({
        $and: [{ userId: req.user.id }, { branchId: branchId }],
      });

      if (registerId) {
        // Delete current value and Add new
        // Get remove index
        const removeIndex = shiftRegister.register
          .map((item) => item.id)
          .indexOf(registerId);

        shiftRegister.register.splice(removeIndex, 1);

        await shiftRegister.save();
      }

      shiftRegister.register.unshift(newRegister);

      await shiftRegister.save();

      res.json(shiftRegister);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       DELETE api/shiftRegisters/register/:register_id/:branchId
// @desc        Delete register from Shift Registers
// @access      Private
router.delete("/register/:register_id/:branchId", auth, async (req, res) => {
  try {
    const shiftRegister = await ShiftRegister.findOne({
      $and: [{ userId: req.user.id }, { branchId: req.params.branchId }],
    });

    // Get remove index
    const removeIndex = shiftRegister.register
      .map((item) => item.id)
      .indexOf(req.params.register_id);

    shiftRegister.register.splice(removeIndex, 1);

    await shiftRegister.save();

    res.json(shiftRegister);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
