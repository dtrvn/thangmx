const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const ShiftForWeek = require("../../models/ShiftForWeek");

// @route       POST api/shiftForWeeks
// @desc        Create or Update Shift For Week
// @access      Private
router.post(
  "/",
  auth,
  async (req, res) => {

    const { id, shiftName, shiftTime, time, dateFrom, dateTo } = req.body;

    // const shiftField = {};
    // if (id) shiftField.id = id;
    // shiftField.shiftName = shiftName;
    // shiftField.shiftTime = shiftTime;
    // shiftField.time = time;
    // shiftField.dateFrom = dateFrom;
    // shiftField.dateTo = dateTo;

    try {
      // let shift = await ShiftForWeek.findOne({ shiftName });

      // if (id) {
        // Update
        // shift = await ShiftForWeek.findOneAndUpdate(
        //   { _id: id },
        //   { $set: shiftField },
        //   { new: true }
        // );
        // return res.json(shift);
      // }

      // if (shift) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "Shift already exists" }] });
      // }

      // Create
      shift = new ShiftForWeek({
        dateFrom,
        dateTo,
      });

      await shift.save();

      res.json(shift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/shiftForWeeks
// @desc        Get all Shifts
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shifts = await ShiftForWeek.find();
    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftForWeeks/:id
// @desc        Get Shift by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const shift = await ShiftForWeek.findById(req.params.id);

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

// @route       DELETE api/shiftForWeeks/:id
// @desc        Delete a Shift
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const shift = await ShiftForWeek.findById(req.params.id);

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

// @route       PUT api/shiftForWeeks/putShift
// @desc        Add Shift and Person in Shift
// @access      Private
router.put("/putShift", async (req, res) => {
  const {
    id,
    shiftId0,
    shiftId1,
    shiftId2,
    shiftId3,
    shiftId4,
    shiftId5,
    shiftId6,
    shiftId7,
    shiftId8,
    shiftId9,
    personNo0,
    personNo1,
    personNo2,
    personNo3,
    personNo4,
    personNo5,
    personNo6,
    personNo7,
    personNo8,
    personNo9,
  } = req.body;

  try {
    const personInShift = await PersonInShift.findById(id);

    if (personInShift) {

      const newRegister0 = {};
      const newRegister1 = {};
      const newRegister2 = {};
      const newRegister3 = {};
      const newRegister4 = {};
      const newRegister5 = {};
      const newRegister6 = {};
      const newRegister7 = {};
      const newRegister8 = {};
      const newRegister9 = {};

      // Add ca 1
      newRegister0.shiftId = shiftId0;
      newRegister0.personNumber = personNo0;
      if (shiftId0 !== "0") {
        const removeIndex0 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId0);
        if (removeIndex0 >= 0) {
          personInShift.personShift.splice(removeIndex0, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister0);
        await personInShift.save();
      }

      // Add ca 2
      newRegister1.shiftId = shiftId1;
      newRegister1.personNumber = personNo1;
      if (shiftId1 !== "0") {
        const removeIndex1 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId1);
        if (removeIndex1 >= 0) {
          personInShift.personShift.splice(removeIndex1, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister1);
        await personInShift.save();
      }
      
      // Add ca 3
      newRegister2.shiftId = shiftId2;
      newRegister2.personNumber = personNo2;
      if (shiftId2 !== "0") {
        const removeIndex2 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId2);
        if (removeIndex2 >= 0) {
          personInShift.personShift.splice(removeIndex2, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister2);
        await personInShift.save();
      }

      // Add ca 4
      newRegister3.shiftId = shiftId3;
      newRegister3.personNumber = personNo3;
      if (shiftId3 !== "0") {
        const removeIndex3 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId3);
        if (removeIndex3 >= 0) {
          personInShift.personShift.splice(removeIndex3, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister3);
        await personInShift.save();
      }

      // Add ca 5
      newRegister4.shiftId = shiftId4;
      newRegister4.personNumber = personNo4;
      if (shiftId4 !== "0") {
        const removeIndex4 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId4);
        if (removeIndex4 >= 0) {
          personInShift.personShift.splice(removeIndex4, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister4);
        await personInShift.save();
      }

      // Add ca 6
      newRegister5.shiftId = shiftId5;
      newRegister5.personNumber = personNo5;
      if (shiftId5 !== "0") {
        const removeIndex5 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId5);
        if (removeIndex5 >= 0) {
          personInShift.personShift.splice(removeIndex5, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister5);
        await personInShift.save();
      }

      // Add ca 7
      newRegister6.shiftId = shiftId6;
      newRegister6.personNumber = personNo6;
      if (shiftId6 !== "0") {
        const removeIndex6 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId6);
        if (removeIndex6 >= 0) {
          personInShift.personShift.splice(removeIndex6, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister6);
        await personInShift.save();
      }

      // Add ca 8
      newRegister7.shiftId = shiftId7;
      newRegister7.personNumber = personNo7;
      if (shiftId7 !== "0") {
        const removeIndex7 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId7);
        if (removeIndex7 >= 0) {
          personInShift.personShift.splice(removeIndex7, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister7);
        await personInShift.save();
      }

      // Add ca 9
      newRegister8.shiftId = shiftId8;
      newRegister8.personNumber = personNo8;
      if (shiftId8 !== "0") {
        const removeIndex8 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId8);
        if (removeIndex8 >= 0) {
          personInShift.personShift.splice(removeIndex8, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister8);
        await personInShift.save();
      }

      // Add ca 10
      newRegister9.shiftId = shiftId9;
      newRegister9.personNumber = personNo9;
      if (shiftId9 !== "0") {
        const removeIndex9 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId9);
        if (removeIndex9 >= 0) {
          personInShift.personShift.splice(removeIndex9, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister9);
        await personInShift.save();
      }

    }

    res.json(personInShift);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
);

module.exports = router;
