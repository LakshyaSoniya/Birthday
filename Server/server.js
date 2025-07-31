const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const http = require('http');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

const SERVER = http.createServer(app);

SERVER.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

