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
    const { name } = req.body;

    if (!name) {
      return sendResponse(res, 400, false, null, "Name is required");
    }

    const newUser = await User.create({ name });

    sendResponse(res, 201, true, newUser, "User created");
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return sendResponse(res, 400, false, null, "Name is required");
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    sendResponse(res, 200, true, user, "User updated");
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

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