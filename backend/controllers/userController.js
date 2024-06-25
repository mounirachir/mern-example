const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @route POST /api/users
// @desc registering new user
// @access public
const registerUser = asyncHandler(async (req, res) => {
  //   validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(
    //   errors
    //     .array()
    //     .map((error) => error.msg)
    //     .join("\n")
    // );

    res.status(400);
    throw new Error(
      errors
        .array()
        .map((error) => error.msg)
        .join("\n")
    );
  }

  //   get user data from request body
  const { name, email, password } = req.body;

  //   check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @route POST /api/users/login
// @desc authenticate user
// @access public
const loginUser = asyncHandler(async (req, res) => {
  // get user data from request body
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (
    user &&
    (await bcrypt.compare(
      typeof password === "undefined" ? "" : password,
      user.password
    ))
  ) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});
// @route GET /api/users/profile
// @desc get user data
// @access private
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

module.exports = { registerUser, loginUser, getProfile };
