const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const ShiftRegister2 = require("../../models/ShiftRegister2");

// @route       POST api/shiftRegisters
// @desc        Create or Update Shift Registers
// @access      Private
router.post("/", auth, async (req, res) => {
  const { id, userId, branchId, dateFrom, dateTo } = req.body;

  try {
    // console.log("nhan gia tri "+userId+" - "+branchId+" - "+dateFrom+" - "+dateTo);
    let shiftRegister2 = await ShiftRegister2.findOne({
      $and: [{ userId: userId }, { branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }],
    });

    if (id) {
      // No Update
      return res.json(shiftRegister2);
    }

    if (!shiftRegister2) {
      shiftRegister2 = null;
    }

    if (shiftRegister2) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Shift Register already exists" }] });
    }

    // Create
    shiftRegister2 = new ShiftRegister2({
      userId,
      branchId,
      dateFrom,
      dateTo
    });

    await shiftRegister2.save();

    res.json(shiftRegister2);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route       DELETE api/shiftRegisters/:id
// @desc        Delete a Shift Register
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const shiftRegister = await ShiftRegister2.findById(req.params.id);

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

// @route       GET api/shift
// @desc        Get all ShiftRegisters
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shiftRegisters2 = await ShiftRegister2.find();
    res.json(shiftRegisters2);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegisters/:branchId/:dateFrom/:dateTo
// @desc        Get Shift Register by branch ID, dateFrom, dateTo
// @access      Private
router.get("/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    // const shiftRegister2 = await ShiftRegister2.findById(req.params.id);
    // console.log("server " + req.params.branchId + " - " + req.params.dateFrom + " - " + req.params.dateTo);
    const shiftRegister2 = await ShiftRegister2.find({
      $and: [{ branchId: req.params.branchId }, { dateFrom: req.params.dateFrom }, { dateTo: req.params.dateTo }],
    });

    if (!shiftRegister2) {
      return res.status(404).json({ msg: "Shift Registers not found" });
    }

    res.json(shiftRegister2);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Registers not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       PUT api/shiftRegisters/register
// @desc        Add Shift Registers
// @access      Private
router.put(
  "/register",
  async (req, res) => {

    const {
      id,
      date,
      registerId0,
      registerId1,
      registerId2,
      shiftId0,
      shiftId1,
      shiftId2,
      jobId0,
      jobId1,
      jobId2,
      cost0,
      cost1,
      cost2,
      shiftFlag0,
      shiftFlag1,
      shiftFlag2,
    } = req.body;

    try {

      const shiftRegister = await ShiftRegister2.findById(id);

      if (shiftRegister) {

        const newRegister0 = {};
        const newRegister1 = {};
        const newRegister2 = {};

        // Add ca 1
        newRegister0.shiftId = shiftId0;
        newRegister0.jobId = jobId0;
        newRegister0.date = date;
        newRegister0.cost = cost0;

        if (shiftFlag0 !== "0") {
          const removeIndex0 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId0);

          if (removeIndex0 >= 0) {
            shiftRegister.register.splice(removeIndex0, 1);

            await shiftRegister.save();
          }

          if (shiftFlag0 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister0);
            await shiftRegister.save();
          }
        }

        // Add ca 2
        newRegister1.shiftId = shiftId1;
        newRegister1.jobId = jobId1;
        newRegister1.date = date;
        newRegister1.cost = cost1;
        if (shiftFlag1 !== "0") {
          const removeIndex1 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId1);
          if (removeIndex1 >= 0) {
            shiftRegister.register.splice(removeIndex1, 1);

            await shiftRegister.save();
          }

          if (shiftFlag1 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister1);
            await shiftRegister.save();
          }
        }


        // Add ca 3
        newRegister2.shiftId = shiftId2;
        newRegister2.jobId = jobId2;
        newRegister2.date = date;
        newRegister2.cost = cost2;
        if (shiftFlag2 !== "0") {
          const removeIndex2 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId2);
          if (removeIndex2 >= 0) {
            shiftRegister.register.splice(removeIndex2, 1);
            await shiftRegister.save();
          }

          if (shiftFlag2 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister2);
            await shiftRegister.save();
          }
        }
      }

      res.json(shiftRegister);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/shiftRegisters/register/unput
// @desc        Delete Shift Registers
// @access      Private
router.put(
  "/register/unput",
  async (req, res) => {
    const {
      registerId,
      userId,
      branchId,
      shiftId,
      jobId,
      dateFrom,
      dateTo,
      date,
      cost,
    } = req.body;

    try {
      const shiftRegister2 = await ShiftRegister2.findOne({
        $and: [{ userId: userId }, { branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }],
      });

      if (shiftRegister2) {
        // console.log("mang "+JSON.stringify(shiftRegister2));
        if (registerId) {
          // Delete current value
          // Get remove index
          const removeIndex = shiftRegister2.register
            .map((item) => item.id)
            .indexOf(registerId);

          shiftRegister2.register.splice(removeIndex, 1);

          await shiftRegister2.save();
        }
      }
      res.json(shiftRegister2);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;