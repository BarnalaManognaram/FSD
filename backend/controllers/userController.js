const User = require("../models/User");

// Helper response
const sendResponse = (res, status, success, data = null, message = null) => {
  res.status(status).json({ success, data, message });
};

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendResponse(res, 200, true, users);
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// GET single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    sendResponse(res, 200, true, user);
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const {
      name,
      regNo,
      email,
      course,
      branch,
      year,
      cgpa,
      phone,
      address
    } = req.body;

    // Basic validation
    if (!name || !regNo || !email) {
      return sendResponse(res, 400, false, null, "Required fields missing");
    }

    const newUser = await User.create({
      name,
      regNo,
      email,
      course,
      branch,
      year,
      cgpa,
      phone,
      address,
      role: "student" // ✅ ensure role is always student
    });

    sendResponse(res, 201, true, newUser, "User created");
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // update all fields
      { new: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    sendResponse(res, 200, true, updatedUser, "User updated");
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};;

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    res.status(204).send();
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};