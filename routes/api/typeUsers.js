const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const TypeUser = require("../../models/TypeUser");

// @route       POST api/typeUsers
// @desc        Create or Update type Users
// @access      Private
router.post(
  "/",
  [
    body("typeUsername", "Type Username is required").not().isEmpty(),
    body("typeUserPercentCost", "Type User Percent cost is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { typeUsername, typeUserPercentCost } = req.body;

    const typeUsersField = {};
    typeUsersField.typeUsername = typeUsername;
    typeUsersField.typeUserPercentCost = typeUserPercentCost;

    try {
      let typeUser = await TypeUser.findOne({ typeUsername });

      if (typeUser) {
        // Update
        typeUser = await TypeUser.findOneAndUpdate(
          { typeUsername: typeUsername },
          { $set: typeUsersField },
          { new: true }
        );
        return res.json(typeUser);
      }

      // Create
      typeUser = new TypeUser({
        typeUsername,
        typeUserPercentCost,
      });

      await typeUser.save();

      res.json(typeUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/typeUsers
// @desc        Get all typeUsers
// @access      Public
router.get("/", async (req, res) => {
  try {
    const typeUsers = await TypeUser.find();
    res.json(typeUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/typeUsers/:id
// @desc        Get typeUser by ID
// @access      Private
router.get("/:id", async (req, res) => {
  try {
    const typeUser = await TypeUser.findById(req.params.id);

    if (!typeUser) {
      return res.status(404).json({ msg: "Type User not found" });
    }

    res.json(typeUser);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Type User not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/typeUser/:id
// @desc        Delete a typeUser
// @access      Private
router.delete("/:id", async (req, res) => {
  try {
    const typeUser = await TypeUser.findById(req.params.id);

    if (!typeUser) {
      return res.status(404).json({ msg: "Type User not found" });
    }

    await typeUser.remove();

    res.json({ msg: "Type User removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Type User not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
