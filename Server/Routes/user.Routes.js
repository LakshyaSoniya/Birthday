const express = require('express');
const Router = express.Router();
const { loginUser, signupUser } = require('../Controllers/user.Controller');
const { uploadFields } = require('../middleware/upload');

Router.post('/login', loginUser);
Router.post('/signup', uploadFields, signupUser);

module.exports = Router;