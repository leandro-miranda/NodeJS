const express = require('express');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userMiddleware, createUser);

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);

router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
