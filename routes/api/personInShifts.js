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
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const personInShift = await PersonInShift.findById(req.params.id);

//     if (!personInShift) {
//       return res.status(404).json({ msg: "Person In Shift not found" });
//     }

//     await personInShift.remove();

//     res.json({ msg: "Person In Shift removed" });
//   } catch (err) {
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Person In Shift not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route       DELETE api/personInShifts/:branchId/:dateFrom/:dateTo
// @desc        Delete Person in shift
// @access      Private
router.delete("/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    const branchId = req.params.branchId;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;

    const personInShiftList = await PersonInShift.find({ $and: [{ branchId: branchId }, { dateFrom: dateFrom }, { dateTo: dateTo }] })
      .sort({ date: 1 });
    // console.log("list "+personInShiftList);
    if (personInShiftList.length === 0) {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }

    // await personInShiftList.remove();

    personInShiftList.map((ele) => {
      ele.remove();
    })

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
      if (shiftId0 && shiftId0 !== "0") {
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
      if (shiftId1 && shiftId1 !== "0") {
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
      if (shiftId2 && shiftId2 !== "0") {
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
      if (shiftId3 && shiftId3 !== "0") {
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
      if (shiftId4 && shiftId4 !== "0") {
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
      if (shiftId5 && shiftId5 !== "0") {
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
      if (shiftId6 && shiftId6 !== "0") {
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
      if (shiftId7 && shiftId7 !== "0") {
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
      if (shiftId8 && shiftId8 !== "0") {
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
      if (shiftId9 && shiftId9 !== "0") {
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
