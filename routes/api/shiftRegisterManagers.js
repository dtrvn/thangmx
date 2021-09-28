const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const ShiftRegisterManager = require("../../models/ShiftRegisterManager");

// @route       POST api/shiftRegisterManagers
// @desc        Create or Update ShiftRegisterManager
// @access      Private
router.post(
  "/",
  auth,
  async (req, res) => {

    const { userId, userIdOld, branchId, dateFrom, dateTo, date } = req.body;
    // console.log("server " + userId + " - " + branchId + " - " + dateFrom + " - " + dateTo + " - " + date);

    try {
      let shiftManager = null;
      if(userIdOld !== ""){
        shiftManager = await ShiftRegisterManager.findOne({
          $and: [{ userId: userIdOld }, { branchId: branchId }, { date: date }],
        });
      }
      // console.log("shiftManager "+JSON.stringify(shiftManager));

      const fieldUpdate = {};
      if (shiftManager !== null) fieldUpdate.id = shiftManager._id;
      fieldUpdate.userId = userId;

      // let shiftManager = null;
      if (shiftManager !== null) {
        // Update
        shiftManager = await ShiftRegisterManager.findOneAndUpdate(
          { _id: shiftManager._id },
          { $set: fieldUpdate },
          { new: true }
        );
        return res.json(shiftManager);
      } else {
        // Create
        shiftManager = new ShiftRegisterManager({
          userId,
          branchId,
          dateFrom,
          dateTo,
          date
        });

        await shiftManager.save();

        res.json(shiftManager);
      }

      // const getShiftManager = await ShiftRegisterManager.find({
      //   $and: [{ userId: userId }, { branchId: branchId }, { date: date }],
      // }).populate("userId", ["name"]).populate("branchId", ["branchName", "branchAddress"]);
      // return res.json(getShiftManager);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/shiftRegisterManagers
// @desc        Get all ShiftRegisterManagers
// @access      Public
router.get("/", async (req, res) => {
  try {
    const shiftManager = await ShiftRegisterManager.find();
    res.json(shiftManager);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegisterManagers/:branchId/:dateFrom/:dateTo
// @desc        Get Shift Register Manager by branch ID, dateFrom, dateTo
// @access      Private
router.get("/:branchId/:dateFrom/:dateTo", auth, async (req, res) => {
  try {
    // const shiftRegister2 = await ShiftRegister2.findById(req.params.id);
    // console.log("server " + req.params.branchId + " - " + req.params.dateFrom + " - " + req.params.dateTo);
    // const shiftManager = await ShiftRegisterManager.find({
    //   $and: [{ branchId: req.params.branchId }, { dateFrom: req.params.dateFrom }, { dateTo: req.params.dateTo }],
    // }).populate("userId", ["name"]).populate("branchId", ["branchName", "branchAddress"]);

    const shiftManager = await ShiftRegisterManager.find({
      $and: [{ branchId: req.params.branchId }, { dateFrom: req.params.dateFrom }, { dateTo: req.params.dateTo }],
    });

    if (!shiftManager) {
      return res.status(404).json({ msg: "Shift Register Manager not found" });
    }

    res.json(shiftManager);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register Manager not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/shiftRegisterManagers/:id
// @desc        Delete a Shift Register Manager
// @access      Private
router.delete("/:userIdOld/:branchId/:date", auth, async (req, res) => {
  try {
    const shiftManager = await ShiftRegisterManager.findOne({
      $and: [{ userId: req.params.userIdOld }, { branchId: req.params.branchId }, { date: req.params.date }],
    });

    if (!shiftManager) {
      return res.status(404).json({ msg: "Shift Register Manager not found" });
    }

    await shiftManager.remove();

    // res.json({ msg: "Shift Register Manager removed" });
    res.json(shiftManager._id);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Shift Register Manager not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
