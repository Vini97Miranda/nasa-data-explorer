const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { date } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  if (!date) {
    return res.status(400).json({ error: 'Missing required query param: date' });
  }

  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data.photos); // returns array
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

module.exports = router;
