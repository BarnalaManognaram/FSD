const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCoursesBySemester
} = require('../controllers/userController');

// Routes
router.get('/', getUsers);
router.get('/:regNo', getUser);
router.post('/', createUser);
router.put('/:regNo', updateUser);
router.delete('/:regNo', deleteUser);
router.post('/login', loginUser);
router.get('/currentCourses/:regNo/', getCoursesBySemester);
module.exports = router;