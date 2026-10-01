// backend/controllers/authController.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "peoplehub_jwt_secret_key_12345",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Must use .select("+password") because select: false is set on the password field
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Contact HR or administrator.",
      });
    }

    // Compare plain password against bcrypt hash using method in User.js
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    // Record last login time without re-validating password
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Strip password before returning user data
    const userObject = user.toObject();
    delete userObject.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userObject,
    });
  } catch (error) {
    console.error("Login controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login.",
      error: error.message,
    });
  }
};

// @desc    Get currently logged-in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile.",
      error: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};