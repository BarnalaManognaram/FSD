const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true , unique: true},
  email: { type: String, required: true },
  course: String,
  branch: String,
  year: String,
  cgpa: Number,
  phone: String,
  address: String,
    role: {
    type: String,
    default: "student",   // ✅ always student by default
    enum: ["student", "admin"]
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema,"student");