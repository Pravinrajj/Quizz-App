const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/model');

// Controller for Signup
exports.signup = async (req, res) => {
  try {
    const {name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
        name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const result = await user.save();

    res.status(201).send({
      message: "User signed up successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error during signup",
      error,
    });
  }
};

// Controller for Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "Email not found",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET, // Use environment variable for the secret
      { expiresIn: "24h" }
    );

    res.status(200).send({
      message: "Login successful",
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error logging in",
      error,
    });
  }
};