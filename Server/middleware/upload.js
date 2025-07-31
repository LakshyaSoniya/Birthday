const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure storage for images with proper private settings
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'memoryImages') {
            return {
                folder: 'birthday_memories',
                allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
                resource_type: 'image',
                type: 'private', // Make images private
                access_mode: 'authenticated' // Restrict access
            };
        } else if (file.fieldname === 'audioFile') {
            return {
                folder: 'birthday_audio',
                allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
                resource_type: 'video', // Cloudinary uses 'video' for audio files
                type: 'private', // Make audio private
                access_mode: 'authenticated' // Restrict access
            };
        }
    }
});

// Configure storage for audio files
const audioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'birthday_audio',
        allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
        resource_type: 'video' // Cloudinary uses 'video' for audio files
        // type: 'authenticated' // Uncomment this line to make audio files private
    }
});

// Create upload middleware
const upload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'memoryImages') {
            // Check if file is an image
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for memory images'), false);
            }
        } else if (file.fieldname === 'audioFile') {
            // Check if file is audio
            if (file.mimetype.startsWith('audio/')) {
                cb(null, true);
            } else {
                cb(new Error('Only audio files are allowed for audio upload'), false);
            }
        } else {
            cb(new Error('Unexpected field'), false);
        }
    }
});

// Create specific upload configurations
const uploadFields = upload.fields([
    { name: 'memoryImages', maxCount: 20 },
    { name: 'audioFile', maxCount: 1 }
]);

// Audio upload with different storage
const audioUpload = multer({
    storage: audioStorage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB for audio
    }
});

module.exports = {
    uploadFields,
    audioUpload
};
