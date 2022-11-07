const express = require('express');
const postMiddleware = require('../middlewares/post.middleware');
const updatePostMiddleware = require('../middlewares/updatePost.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
} = require('../controllers/post.controller');

const router = express.Router();

router.post('/', authMiddleware, postMiddleware, createPost);
router.post('/:id');

router.get('/', authMiddleware, getAllPosts);
router.get('/search', authMiddleware, searchPost);
router.get('/:id', authMiddleware, getPostById);

router.put('/:id', authMiddleware, updatePostMiddleware, updatePost);

router.delete('/:id', authMiddleware, deletePost);

module.exports = router;