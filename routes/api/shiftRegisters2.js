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

// @route       POST api/shiftRegisters/updateUser
// @desc        Update user in shift register
// @access      Private
router.post(
  "/updateUser",
  auth,
  async (req, res) => {
    const {
      userId,
    } = req.body;

    // Build shiftRegister object
    const shiftRegisterFields = {};
    if (userId) shiftRegisterFields.userId = userId;
    try {
      let shiftRegist = await ShiftRegister2.findOne({ _id: req.body.id });
      if (shiftRegist) {
        // Update
        shiftRegist = await ShiftRegister2.findOneAndUpdate(
          { _id: req.body.id },
          { $set: shiftRegisterFields },
          { new: true }
        );
        return res.json(shiftRegist);
      }
    } catch (shiftRegist) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET api/shiftRegisters/:id
// @desc        Get shiftRegisters by ID
// @access      Private
router.get("/getById/:id", auth, async (req, res) => {
  try {
    const shiftRegist = await ShiftRegister2.findById(req.params.id);

    if (!shiftRegist) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    res.json(shiftRegist);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register not found" });
    }
    res.status(500).send("Server Error");
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

// @route       DELETE api/shiftRegisters/allUser/:branchId/:dateFrom/:dateTo
// @desc        Delete Shift Registers
// @access      Private
router.delete("/allUser/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;

    const shiftRegist = await ShiftRegister2.find({ $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }] })
      .sort({ date: 1 });
    // console.log("list "+shiftRegist);
    if (shiftRegist.length === 0) {
      return res.status(404).json({ msg: "Shift Register not found" });
    }

    // await shiftRegist.remove();

    shiftRegist.map((ele) => {
      ele.remove();
    })

    res.json({ msg: "Shift Registers removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Registers not found" });
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
    // const shiftRegister2 = await ShiftRegister2.find({ branchId: req.params.branchId });

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

// // @route       GET api/shiftRegisters/salary/:userId/:dateFrom/:dateTo
// // @desc        Get Shift Register by dateFrom, dateTo
// // @access      Private
// router.get("/shiftRegisterForWeek/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
//   try {
//     const shiftRegister2 = await ShiftRegister2.find({
//       $and: [{ branchId: req.params.branchId }, { dateFrom: req.params.dateFrom }, { dateTo: req.params.dateTo }],
//     });

//     if (!shiftRegister2) {
//       return res.status(404).json({ msg: "Shift Registers not found" });
//     }

//     res.json(shiftRegister2);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Shift Registers not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route       GET api/shiftRegisters/salary/:userId/:dateFrom/:dateTo
// @desc        Get Shift Register by dateFrom, dateTo
// @access      Private
router.get("/salary/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    // const shiftRegister2 = await ShiftRegister2.findById(req.params.id);
    // console.log("server " + req.params.branchId + " - " + req.params.dateFrom + " - " + req.params.dateTo);
    const shiftRegister2 = await ShiftRegister2.find({
      $and: [{ dateFrom: { $gte: req.params.dateFrom} }, { dateTo: { $lte: req.params.dateTo} }],
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

// @route       GET api/shiftRegisters/salaryPersonal/:userId/:dateFrom/:dateTo
// @desc        Get Shift Register by userId, dateFrom, dateTo
// @access      Private
router.get("/salaryPersonal/:userId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    // const shiftRegister2 = await ShiftRegister2.findById(req.params.id);
    // console.log("server " + req.params.branchId + " - " + req.params.dateFrom + " - " + req.params.dateTo);
    const shiftRegister2 = await ShiftRegister2.find({
      $and: [{ userId: req.params.userId }, { dateFrom: { $gte: req.params.dateFrom} }, { dateTo: { $lte: req.params.dateTo} }],
    });
    // .sort({ date: 1 })
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
      registerId3,
      registerId4,
      registerId5,
      registerId6,
      registerId7,
      registerId8,
      registerId9,
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
      jobId0,
      jobId1,
      jobId2,
      jobId3,
      jobId4,
      jobId5,
      jobId6,
      jobId7,
      jobId8,
      jobId9,
      cost0,
      cost1,
      cost2,
      cost3,
      cost4,
      cost5,
      cost6,
      cost7,
      cost8,
      cost9,
      shiftFlag0,
      shiftFlag1,
      shiftFlag2,
      shiftFlag3,
      shiftFlag4,
      shiftFlag5,
      shiftFlag6,
      shiftFlag7,
      shiftFlag8,
      shiftFlag9,
    } = req.body;

    try {

      const shiftRegister = await ShiftRegister2.findById(id);

      if (shiftRegister) {

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

        // Add ca 4
        newRegister3.shiftId = shiftId3;
        newRegister3.jobId = jobId3;
        newRegister3.date = date;
        newRegister3.cost = cost3;
        if (shiftFlag3 !== "0") {
          const removeIndex3 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId3);
          if (removeIndex3 >= 0) {
            shiftRegister.register.splice(removeIndex3, 1);
            await shiftRegister.save();
          }

          if (shiftFlag3 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister3);
            await shiftRegister.save();
          }
        }

        // Add ca 5
        newRegister4.shiftId = shiftId4;
        newRegister4.jobId = jobId4;
        newRegister4.date = date;
        newRegister4.cost = cost4;
        if (shiftFlag4 !== "0") {
          const removeIndex4 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId4);
          if (removeIndex4 >= 0) {
            shiftRegister.register.splice(removeIndex4, 1);
            await shiftRegister.save();
          }

          if (shiftFlag4 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister4);
            await shiftRegister.save();
          }
        }

        // Add ca 6
        newRegister5.shiftId = shiftId5;
        newRegister5.jobId = jobId5;
        newRegister5.date = date;
        newRegister5.cost = cost5;
        if (shiftFlag5 !== "0") {
          const removeIndex5 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId5);
          if (removeIndex5 >= 0) {
            shiftRegister.register.splice(removeIndex5, 1);
            await shiftRegister.save();
          }

          if (shiftFlag5 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister5);
            await shiftRegister.save();
          }
        }

        // Add ca 7
        newRegister6.shiftId = shiftId6;
        newRegister6.jobId = jobId6;
        newRegister6.date = date;
        newRegister6.cost = cost6;
        if (shiftFlag6 !== "0") {
          const removeIndex6 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId6);
          if (removeIndex6 >= 0) {
            shiftRegister.register.splice(removeIndex6, 1);
            await shiftRegister.save();
          }

          if (shiftFlag6 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister6);
            await shiftRegister.save();
          }
        }

        // Add ca 8
        newRegister7.shiftId = shiftId7;
        newRegister7.jobId = jobId7;
        newRegister7.date = date;
        newRegister7.cost = cost7;
        if (shiftFlag7 !== "0") {
          const removeIndex7 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId7);
          if (removeIndex7 >= 0) {
            shiftRegister.register.splice(removeIndex7, 1);
            await shiftRegister.save();
          }

          if (shiftFlag7 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister7);
            await shiftRegister.save();
          }
        }

        // Add ca 9
        newRegister8.shiftId = shiftId8;
        newRegister8.jobId = jobId8;
        newRegister8.date = date;
        newRegister8.cost = cost8;
        if (shiftFlag8 !== "0") {
          const removeIndex8 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId8);
          if (removeIndex8 >= 0) {
            shiftRegister.register.splice(removeIndex8, 1);
            await shiftRegister.save();
          }

          if (shiftFlag8 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister8);
            await shiftRegister.save();
          }
        }

        // Add ca 10
        newRegister9.shiftId = shiftId9;
        newRegister9.jobId = jobId9;
        newRegister9.date = date;
        newRegister9.cost = cost9;
        if (shiftFlag9 !== "0") {
          const removeIndex9 = shiftRegister.register
            .map((item) => item._id)
            .indexOf(registerId9);
          if (removeIndex9 >= 0) {
            shiftRegister.register.splice(removeIndex9, 1);
            await shiftRegister.save();
          }

          if (shiftFlag9 === "3") {
            // Delete
            // Đã xoá ở trên rồi
          } else {
            // Add or Update
            shiftRegister.register.unshift(newRegister9);
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
