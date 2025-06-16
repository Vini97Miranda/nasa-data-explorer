const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apodRoute = require('./routes/apod');
app.use('/api/apod', apodRoute);

const marsRoute = require('./routes/mars');
app.use('/api/mars', marsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend is running on port ${PORT}`);
});