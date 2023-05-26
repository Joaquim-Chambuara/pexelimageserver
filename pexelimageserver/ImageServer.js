require('dotenv').config();
const port = process.env.PORT || 3000;
const apikey = process.env.PEXELS_API_KEY;
const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.get('/api/images', async (req, res) => {
    const url = `https://api.pexels.com/v1/search?query=${req.query.query}&page=${req.query.page}&per_page=${req.query.per_page}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: apikey
        }
      });
      console.log(response.data.photos);
      res.json(response.data.photos);
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ message: 'Server error' });
    }
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port ${port}`));
