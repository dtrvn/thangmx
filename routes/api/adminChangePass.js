const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route       POST api/users
// @desc        Change Password
// @access      Private
router.post(
  "/",
  auth,
  [body("password", "Mật khẩu phải ít nhất 6 kí tự").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;

    try {
      const userField = {};
      if (id) userField.password = password;

      const salt = await bcrypt.genSalt(10);

      userField.password = await bcrypt.hash(userField.password, salt);

      // Update
      let user = await User.findOneAndUpdate(
        { _id: id },
        { $set: userField },
        { new: true }
      );
      return res.json(id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
