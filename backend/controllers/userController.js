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
    const user = await User.findOne({ regNo: req.params.regNo.toUpperCase().trim() });

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
      semester,
      cgpa,
      phone,
      address
    } = req.body;

    // Basic validation
    if (!name || !regNo || !email) {
      return sendResponse(res, 400, false, null, "Required fields missing");
    }
     const defaultCourses = [
      {
        courseName: "C Programming",
        courseCode: "CS101",
        year: 1,
        semester: 1,
        marks: 0,
        grade: "NA"
      },
      {
        courseName: "DSA",
        courseCode: "CS102",
        year: 1,
        semester: 2,
        marks: 0,
        grade: "NA"
      }
    ];

    const newUser = await User.create({
      name,
      regNo: regNo.trim().toUpperCase(),  // ✅ standardize regNo
      email,
      course,
      branch,
      year,
      semester,
      cgpa,
      phone,
      courses: defaultCourses,
      address,
      password: regNo.trim().toUpperCase()  // ✅ default password = regNo
    });

    sendResponse(res, 201, true, newUser, "User created");
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const regNo = req.params.regNo.toUpperCase().trim();

    const updatedUser = await User.findOneAndUpdate(
      { regNo: regNo },   // 🔥 FIX: search by regNo field
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    sendResponse(res, 200, true, updatedUser, "User updated");

  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const regNo = req.params.regNo.toUpperCase().trim();
    const user = await User.findOneAndDelete({ regNo: regNo });

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    res.status(204).send();
  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ regNo: regNo.toUpperCase().trim() });
    if (!user) {
      return sendResponse(res, 400, false, null, "User not found");
    }

    // 2. Check password
    if (user.password !== password) {
      return sendResponse(res, 400, false, null, "Invalid password");
    }

    // 3. Success
    sendResponse(res, 200, true, user, "Login successful");

  } catch (error) {
    sendResponse(res, 500, false, null, error.message);
  }
};


exports.getCoursesBySemester = async (req, res) => {
  try {

    const regNo = req.params.regNo
      .toUpperCase()
      .trim();

    // Find user first
    const user = await User.findOne({ regNo });

    if (!user) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "User not found"
      );
    }

    // Get current year from user
    const currentYear = Number(user.year);
    const currentSemester = Number(user.semester);

    // Aggregation
    const courses = await User.aggregate([

      // Match student
      {
        $match: {
          regNo: regNo
        }
      },

      // Convert courses array into documents
      {
        $unwind: "$courses"
      },

      // Filter current year courses
      {
        $match: {
          "courses.year": currentYear,  
          "courses.semester": currentSemester
        }
      },

      // Return selected fields
      {
        $project: {
          _id: 0,
          courseName: "$courses.courseName",
          courseCode: "$courses.courseCode",
          year: "$courses.year",
          semester: "$courses.semester",
          marks: "$courses.marks",
          grade: "$courses.grade"
        }
      }

    ]);

    if (!courses.length) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "No courses found"
      );
    }

    sendResponse(
      res,
      200,
      true,
      courses
    );

  } catch (error) {

    sendResponse(
      res,
      500,
      false,
      null,
      error.message
    );
  }
};