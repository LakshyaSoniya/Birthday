const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./Routes/user.Routes.js');
const mediaRoutes = require('./Routes/media.Routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 50000 }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});
// Import routes
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;


