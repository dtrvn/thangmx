const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Branch = require("../../models/Branch");

// @route       POST api/branchs
// @desc        Create or Update Branch
// @access      Private
router.post(
  "/",
  auth,
  [
    body("branchName", "Branch name is required").not().isEmpty(),
    body("branchAddress", "Branch address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, branchName, branchAddress } = req.body;

    const branchField = {};
    if (id) branchField.id = id;
    branchField.branchName = branchName;
    branchField.branchAddress = branchAddress;

    try {
      let branch = await Branch.findOne({ branchName });

      if (id) {
        // Update
        branch = await Branch.findOneAndUpdate(
          { _id: id },
          { $set: branchField },
          { new: true }
        );
        return res.json(branch);
      }

      if (branch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Branch already exists" }] });
      }

      // Create
      branch = new Branch({
        branchName,
        branchAddress,
      });

      await branch.save();

      res.json(branch);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/branchs
// @desc        Get all Branchs
// @access      Public
router.get("/", async (req, res) => {
  try {
    const branchs = await Branch.find();
    res.json(branchs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/branchs/:id
// @desc        Get Branch by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({ msg: "Branch not found" });
    }

    res.json(branch);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Branch not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/branchs/:id
// @desc        Delete a branch
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({ msg: "Branch not found" });
    }

    await branch.remove();

    res.json({ msg: "Branch removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Branch not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
