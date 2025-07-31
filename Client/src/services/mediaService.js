import axios from 'axios';

const API_BASE = import.meta.env.VITE_URL;

// Set up axios interceptor for token
const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const getUserMedia = async () => {
    try {
        setupAxiosInterceptors();
        const response = await axios.get(`${API_BASE}/api/media/user-media`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user media:', error);
        throw error;
    }
};

export const getSignedImageUrl = async (imageId) => {
    try {
        setupAxiosInterceptors();
        const response = await axios.get(`${API_BASE}/api/media/image/${imageId}`);
        return response.data.signedUrl;
    } catch (error) {
        console.error('Error getting signed image URL:', error);
        throw error;
    }
};

export const getSignedAudioUrl = async (audioId) => {
    try {
        setupAxiosInterceptors();
        const response = await axios.get(`${API_BASE}/api/media/audio/${audioId}`);
        return response.data.signedUrl;
    } catch (error) {
        console.error('Error getting signed audio URL:', error);
        throw error;
    }
};
