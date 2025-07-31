const mongoose = require('mongoose');

const connectDB = () => {
  const mongoUri = process.env.DB_URL;
  console.log(`Connecting to MongoDB at ${mongoUri}`);
  
  
  mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));
};

module.exports = connectDB;