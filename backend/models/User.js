const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: String,
  year: Number,
  semester: Number,
  marks: Number,
  grade: String
}, { _id: false });
const currentCourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: String,
  year: Number,
  semester: Number,
  T1: Number,
  T2: Number,
  T3: Number, 
  T4: Number,
  T5_1: Number,
  T5_2: Number,
  T5_3: Number,
  T5_4: Number,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },

  course: String,
  branch: String,
  year: Number,
  semester: Number,
  cgpa: Number,
  phone: String,
  address: String,

  role: {
    type: String,
    default: "student",
    enum: ["student", "admin"]
  },

  courses: [courseSchema],
  currentCourses: [currentCourseSchema],
  password: { type: String, required: true }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema, "student");