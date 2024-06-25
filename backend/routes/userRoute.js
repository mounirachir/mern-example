const { body } = require("express-validator");

const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/",
  body("name", "please include your name").notEmpty(),
  body("email", "please include a valid email").isEmail(),
  body(
    "password",
    "please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
  registerUser
);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
module.exports = router;
