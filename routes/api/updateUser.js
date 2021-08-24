const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route       POST api/updateUser
// @desc        Create or Update User
// @access      Private
router.post(
  "/",
  auth,
  [
    body("name", "Không được để trống Họ và tên").not().isEmpty(),
    body("email", "Không được để trống email").isEmail(),
    body("phone", "Không được để trống số điện thoại").not().isEmpty(),
    body("typeUserId", "Không được để trống loại nhân viên").not().isEmpty(),
    body("status", "Không được để trống trạng thái").not().isEmpty(),
    body("roles", "Không được để trống quyền").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, email, phone, password, typeUserId, status, roles } = req.body;

    const userField = {};
    if (id) userField.id = id;
    userField.name = name;
    userField.email = email;
    userField.phone = phone;
    userField.typeUserId = typeUserId;
    userField.status = status;
    userField.roles = roles;

    try {
      let user = await User.findOne({ email });

      if (id) {
        // Update
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: userField },
          { new: true }
        );
        return res.json(user);
      }

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // const password = 123456;
      // Create
      user = new User({
        name,
        email,
        phone,
        password,
        typeUserId,
        status,
        roles,
      });

      const salt = await bcrypt.genSalt(10);
      
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
