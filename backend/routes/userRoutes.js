const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCoursesBySemester,
  getCurrentCourses,
  addCourseToStudent,
  addCurrentCourseToStudent
} = require("../controllers/userController");


// ======================
// AUTH ROUTES
// ======================

router.post("/login", loginUser);


// ======================
// COURSE ROUTES
// ======================

router.get(
  "/getCoursesBySemester/:regNo",
  getCoursesBySemester
);

router.get(
  "/getCurrentCourses/:regNo",
  getCurrentCourses
);

router.put(
  "/:regNo/add-course",
  addCourseToStudent
);

router.put(
  "/:regNo/add-current-course",
  addCurrentCourseToStudent
);


// ======================
// USER CRUD ROUTES
// ======================

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:regNo", getUser);

router.put("/:regNo", updateUser);

router.delete("/:regNo", deleteUser);


module.exports = router;