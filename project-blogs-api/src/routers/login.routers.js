const express = require('express');
const { login } = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

const router = express.Router();

router.post('/', loginMiddleware, login);

module.exports = router;