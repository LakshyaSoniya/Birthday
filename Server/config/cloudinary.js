const cloudinary = require('cloudinary').v2;

console.log('Configuring Cloudinary with:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set'
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Always use HTTPS
});

// Test the configuration
cloudinary.api.ping()
    .then(() => {
        console.log('✅ Cloudinary connection successful');
    })
    .catch((error) => {
        console.error('❌ Cloudinary connection failed:', error);
    });

module.exports = cloudinary;
