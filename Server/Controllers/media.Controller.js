const cloudinary = require('../config/cloudinary');
const User = require('../Models/userModel');

const getUserMedia = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate signed URLs for all user's images using public_id
        const signedImages = user.memoryImages.map(image => {
            let signedUrl = null;
            
            if (image.public_id) {
                try {
                    // Generate signed URL for private image
                    signedUrl = cloudinary.url(image.public_id, {
                        sign_url: true,
                        type: 'private',
                        resource_type: 'image',
                        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
                        secure: true
                    });
                    
                    console.log(`Generated signed URL for ${image.public_id}:`, signedUrl);
                } catch (urlError) {
                    console.error(`Error generating signed URL for ${image.public_id}:`, urlError);
                }
            }

            return {
                ...image.toObject(),
                signedUrl: signedUrl || image.url // Fallback to original URL if signing fails
            };
        });

        // Generate signed URL for audio if exists
        let signedAudioUrl = null;
        if (user.audioUrl && user.audioPublicId) {
            try {
                signedAudioUrl = cloudinary.url(user.audioPublicId, {
                    sign_url: true,
                    type: 'private',
                    resource_type: 'video',
                    expires_at: Math.floor(Date.now() / 1000) + 3600,
                    secure: true
                });
                
                console.log(`Generated signed audio URL for ${user.audioPublicId}:`, signedAudioUrl);
            } catch (audioError) {
                console.error(`Error generating signed audio URL:`, audioError);
                signedAudioUrl = user.audioUrl; // Fallback
            }
        }

        res.json({
            images: signedImages,
            audioUrl: signedAudioUrl,
            Home: user.Home,
            letter: user.letter
        });

    } catch (error) {
        console.error('Error fetching user media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSignedImageUrl = async (req, res) => {
    try {
        const { publicId } = req.params;
        const userId = req.user._id;

        // Find user and check if they own this image
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the image belongs to this user
        const hasAccess = user.memoryImages.some(img => img.public_id === publicId);

        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied to this image' });
        }

        // Generate signed URL for private image
        const signedUrl = cloudinary.url(publicId, {
            sign_url: true,
            type: 'private',
            resource_type: 'image',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            secure: true
        });

        res.json({ signedUrl });

    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSignedAudioUrl = async (req, res) => {
    try {
        const { publicId } = req.params;
        const userId = req.user._id;

        // Find user and check if they own this audio
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the audio belongs to this user
        if (user.audioPublicId !== publicId) {
            return res.status(403).json({ message: 'Access denied to this audio' });
        }

        // Generate signed URL for private audio
        const signedUrl = cloudinary.url(publicId, {
            sign_url: true,
            type: 'private',
            resource_type: 'video',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            secure: true
        });

        res.json({ signedUrl });

    } catch (error) {
        console.error('Error generating signed audio URL:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getSignedImageUrl,
    getSignedAudioUrl,
    getUserMedia
};
