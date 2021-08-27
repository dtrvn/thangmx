const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const PersonInShift = require("../../models/PersonInShift");

// @route       POST api/personInShifts
// @desc        Create or Update PersonInShifts
// @access      Private
router.post("/", auth, async (req, res) => {
  const { id, branchId, dateFrom, dateTo, date } = req.body;
  // console.log("get "+branchId+"-"+dateFrom+"-"+dateTo+"-"+date);
  try {
    // let personInShift = await PersonInShift.findOne({
    //   $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }],
    // });
    // if (id) {
    //   // No Update
    //   return res.json(personInShift);
    // }

    // if (!personInShift) {
    //   personInShift = null;
    // }

    // if (personInShift) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: "Person In Shift already exists" }] });
    // }

    // Create
    let personInShift = new PersonInShift({
      branchId,
      dateFrom,
      dateTo,
      date,
    });

    await personInShift.save();

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
);

// // @route       POST api/personInShifts/add
// // @desc        Create and Update PersonInShifts
// // @access      Private
// router.post("/add/", auth, async (req, res) => {
//   const { id, branchId, startDate, endDate, currentDate, shiftId0, shiftId1, shiftId2, personNo0, personNo1, personNo2 } = req.body;
//   console.log("get "+id+" - "+branchId+"-"+startDate+"-"+endDate+"-"+currentDate+"-"+shiftId0+"-"+shiftId1+"-"+shiftId2+"-"+personNo0+"-"+personNo1+"-"+personNo2);
//   try {
//     let personInShift = await PersonInShift.findById(id);
//     if (id) {
//       // No Update
//       return res.json(personInShift);
//     }

//     if (!personInShift) {
//       personInShift = null;
//     }

//     // if (personInShift) {
//     //   return res
//     //     .status(400)
//     //     .json({ errors: [{ msg: "Person In Shift already exists" }] });
//     // }

//     // Create
//     // personInShift = new PersonInShift({
//     //   branchId,
//     //   dateFrom,
//     //   dateTo,
//     //   date,
//     // });

//     // await personInShift.save();

//     res.json(personInShift);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// }
// );

// @route       GET api/personInShifts
// @desc        Get all PersonInShifts
// @access      Public
router.get("/", async (req, res) => {
  try {
    const personInShifts = await PersonInShift.find();
    res.json(personInShifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegisters
// @desc        Get Person in Shift by dateFrom and dateTo
// @access      Public
router.get("/weeks/:branchId/:dateFrom/:dateTo", async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;

    // console.log("server "+branchId+" - "+dateFrom+" - "+dateTo);

    const personInShift = await PersonInShift.find({ $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }] })
      .sort({ date: 1 });

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route       GET api/shiftRegisters
// @desc        Get Person in Shift by dateFrom and dateTo and date
// @access      Public
router.get("/:branchId/:dateFrom/:dateTo/:date", async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;
    const date = req.params.date;

    // console.log("server " + branchId + " - " + dateFrom + " - " + dateTo + " - " + date);

    const personInShift = await PersonInShift.find({ $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }] })
      .sort({ date: 1 });

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route       GET api/shiftRegisters
// @desc        Get Person in Shift by dateFrom and dateTo and date
// @access      Public
// router.get("/:dateFrom/:dateTo/:date", async (req, res) => {
//   try {
//     const dateFrom = req.params.dateFrom;
//     const dateTo = req.params.dateTo;
//     const date = req.params.date;

//     const personInShift = await PersonInShift.find({ $and: [{ dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }] })
//       .sort({ date: 1, shiftId: 1 });

//     res.json(personInShift);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }

// });

// @route       GET api/personInShifts/:shiftId
// @desc        Get PersonInShift by ID
// @access      Private
// router.get("/:shiftId", auth, async (req, res) => {
//   const shiftId = req.params.shiftId;
//   try {
//     const personInShift = await PersonInShift.findOne({ shiftId });

//     if (!personInShift) {
//       return res.status(404).json({ msg: "Person In Shift not found" });
//     }

//     res.json(personInShift);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Person In Shift not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route       DELETE api/personInShift/:id
// @desc        Delete a PersonInShift
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const personInShift = await PersonInShift.findById(req.params.id);

    if (!personInShift) {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }

    await personInShift.remove();

    res.json({ msg: "Person In Shift removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       PUT api/personInShift/personShift
// @desc        Add Person Shift
// @access      Private
router.put("/personShift", async (req, res) => {
  const {
    id,
    branchId,
    dateFrom,
    dateTo,
    date,
    shiftId0,
    shiftId1,
    shiftId2,
    personNo0,
    personNo1,
    personNo2,
  } = req.body;

  try {
    // console.log("ngay "+branchId+" - "+dateFrom+" - "+dateTo+" - "+date);
    // const personInShift = await PersonInShift.findOne({
    //   $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }],
    // });
    // console.log("get id "+id);
    const personInShift = await PersonInShift.findById(id);

    // if (personInShift) {
    //   if (personShiftId) {
    //     // Delete current value and Add new
    //     // Get remove index
    //     const removeIndex = personInShift.personShift
    //       .map((item) => item.id)
    //       .indexOf(personShiftId);

    //       personInShift.personShift.splice(removeIndex, 1);

    //     await personInShift.save();
    //   }

    //   personInShift.personShift.unshift(newRegister);

    //   await personInShift.save();


    // }

    if (personInShift) {
      // Delete current value and Add new
      // Get remove index
      // console.log("personInShift "+JSON.stringify(personInShift));
      // console.log("personInShift "+JSON.stringify(personInShift));
      // console.log("shiftId "+shiftId);

      // const removeIndex = personInShift.personShift
      //   .map((item) => item.shiftId)
      //   .indexOf(shiftId);
      // if (removeIndex > 0) {
      //   personInShift.personShift.splice(removeIndex, 1);

      //   await personInShift.save();
      // }

      // personInShift.personShift.unshift(newRegister);

      const newRegister0 = {};
      const newRegister1 = {};
      const newRegister2 = {};

      // Add ca 1
      newRegister0.shiftId = shiftId0;
      newRegister0.personNumber = personNo0;
      if (shiftId0 !== "0") {
        const removeIndex0 = personInShift.personShift
          .map((item) => item.shiftId)
          .indexOf(shiftId0);
        if (removeIndex0 > 0) {
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
        if (removeIndex1 > 0) {
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
        if (removeIndex2 > 0) {
          personInShift.personShift.splice(removeIndex2, 1);

          await personInShift.save();
        }
        personInShift.personShift.unshift(newRegister2);
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

// @route       PUT api/personInShift/personShift/unput
// @desc        Delete Person Shift
// @access      Private
router.put(
  "/personShift/unput",
  async (req, res) => {
    const {
      personShiftId,
      branchId,
      shiftId,
      dateFrom,
      dateTo,
      date,
    } = req.body;

    try {
      const personInShift = await PersonInShift.findOne({
        $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }],
      });

      if (personShiftId) {
        // console.log("mang "+JSON.stringify(shiftRegister2));
        if (registerId) {
          // Delete current value
          // Get remove index
          const removeIndex = personInShift.personShift
            .map((item) => item.id)
            .indexOf(personShiftId);

          personInShift.personShift.splice(removeIndex, 1);

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
