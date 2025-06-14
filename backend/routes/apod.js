const express = require('express');
const axios = require('axios');
const router = express.Router(); // <-- ESSENCIAL!

router.get('/', async (req, res) => {
  const { date } = req.query;
  const baseUrl = 'https://api.nasa.gov/planetary/apod';
  const apiKey = process.env.NASA_API_KEY;

  try {
    const url = `${baseUrl}?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

module.exports = router;
