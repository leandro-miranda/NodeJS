const postService = require('../services/post.service');

const createPost = async (req, res) => {
  const { id } = req.tokenData;
  const { code, newPost, message } = await postService.createPost(req.body, id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(newPost);
};

const getAllPosts = async (_req, res) => {
  const { code, posts } = await postService.getAllPosts();

  return res.status(code).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { code, message, post } = await postService.getPostById(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(post);
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.tokenData;
  const { title, content } = req.body;

  const { code, message, updatedPost } = await postService
    .updatePost(postId, userId, title, content);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.tokenData;

  const { code, message } = await postService.deletePost(postId, userId);

  if (message) return res.status(code).json({ message });

  return res.status(code).send();
};

const searchPost = async (req, res) => {
  const { q: queryParam } = req.query;

  const { code, posts } = await postService.searchPost(queryParam);

  return res.status(code).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};