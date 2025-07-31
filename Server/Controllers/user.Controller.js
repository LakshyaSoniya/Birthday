const User = require('../Models/userModel');

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = user.genToken();
        
        // Don't send raw cloudinary URLs, client will request signed URLs
        const userResponse = {
            id: user._id,
            name: user.name,
            nickname: user.nickname,
            Home: user.Home,
            letter: user.letter,
            hasImages: user.memoryImages.length > 0,
            hasAudio: !!user.audioUrl
        };
        
        res.status(200).json({ 
            token: token, 
            user: userResponse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const signupUser = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const {
            birthdayPersonName,
            selfName,
            nickname,
            password,
            home_title,
            home_subtitle,
            home_message,
            letter_title,
            letter_greeting,
            letter_specialMessage,
            letter_signature,
            letter_signatureName
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ name: birthdayPersonName });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Process letter body paragraphs
        let letterBody = [];
        
        console.log('Raw letter_body:', req.body.letter_body);
        console.log('Type of letter_body:', typeof req.body.letter_body);
        console.log('Is array:', Array.isArray(req.body.letter_body));
        
        // Check if letter_body comes as a direct array
        if (req.body.letter_body) {
            if (Array.isArray(req.body.letter_body)) {
                letterBody = req.body.letter_body.filter(paragraph => 
                    paragraph && paragraph.toString().trim() !== ''
                ).map(paragraph => paragraph.toString().trim());
            } else if (typeof req.body.letter_body === 'string') {
                // Handle single paragraph as string
                if (req.body.letter_body.trim() !== '') {
                    letterBody = [req.body.letter_body.trim()];
                }
            }
        }
        
        // Fallback: Check for indexed pattern if letterBody is still empty
        if (letterBody.length === 0) {
            let index = 0;
            while (req.body[`letter_body[${index}]`] !== undefined) {
                const paragraph = req.body[`letter_body[${index}]`];
                if (paragraph && paragraph.toString().trim() !== '') {
                    letterBody.push(paragraph.toString().trim());
                }
                index++;
            }
        }

        // Debug logging
        console.log('Final letter body paragraphs:', letterBody);
        console.log('Letter body length:', letterBody.length);

        // Process memory images with proper public_id extraction
        const memoryImages = [];
        if (req.files && req.files.memoryImages) {
            const files = Array.isArray(req.files.memoryImages) 
                ? req.files.memoryImages 
                : [req.files.memoryImages];
            
            files.forEach((file, index) => {
                console.log(`Memory image ${index}:`, {
                    path: file.path,
                    filename: file.filename,
                    public_id: file.filename
                });
                
                memoryImages.push({
                    url: file.path, // Full Cloudinary URL
                    public_id: file.filename, // Public ID for generating signed URLs
                    caption: req.body[`memoryCaptions[${index}]`] || '',
                    subtitle: req.body[`memorySubtitles[${index}]`] || ''
                });
            });
        }

        // Process audio file with proper public_id
        let audioUrl = null;
        let audioPublicId = null;
        if (req.files && req.files.audioFile && req.files.audioFile[0]) {
            const audioFile = req.files.audioFile[0];
            audioUrl = audioFile.path;
            audioPublicId = audioFile.filename;
            console.log('Audio file processed:', {
                path: audioFile.path,
                filename: audioFile.filename,
                public_id: audioFile.filename
            });
        }

        // Create user data structure
        const userData = {
            name: birthdayPersonName,
            password: password,
            nickname: nickname || '',
            selfName: selfName,
            audioUrl: audioUrl,
            audioPublicId: audioPublicId,
            Home: {
                title: home_title || '',
                subtitle: home_subtitle || '',
                message: home_message || ''
            },
            letter: {
                title: letter_title || '',
                greeting: letter_greeting || '',
                body: letterBody,
                specialMessage: letter_specialMessage || '',
                signature: letter_signature || '',
                signatureName: letter_signatureName || ''
            },
            memoryImages: memoryImages
        };

        console.log('User data being saved:', JSON.stringify(userData, null, 2));
        console.log('Letter body in userData:', userData.letter.body);

        // Create new user
        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json({ 
            message: 'Birthday surprise created successfully!',
            user: {
                id: newUser._id,
                name: newUser.name,
                nickname: newUser.nickname
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: 'Server error during signup',
            error: error.message 
        });
    }
};

module.exports = {
    loginUser, 
    signupUser
};