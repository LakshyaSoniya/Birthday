const express = require('express');
const Router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { 
    getSignedImageUrl, 
    getSignedAudioUrl, 
    getUserMedia 
} = require('../Controllers/media.Controller');

// Protected routes - require authentication
Router.get('/image/:imageId', authenticateToken, getSignedImageUrl);
Router.get('/audio/:audioId', authenticateToken, getSignedAudioUrl);
Router.get('/user-media', authenticateToken, getUserMedia);

module.exports = Router;
