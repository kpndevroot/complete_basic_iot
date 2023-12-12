const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const esp8266IP = 'http://192.168.1.2'; // Replace with your ESP8266's IP address

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/led/on', async (req, res) => {
  try {
    // Send request to turn on the LED
    const response = await axios.get(`${esp8266IP}/on`);
    res.send(response.data);
  } catch (error) {
    console.error('Error turning on LED:', error.message);
    res.status(500).send('Failed to turn on LED');
  }
});

app.get('/led/off', async (req, res) => {
  try {
    // Send request to turn off the LED
    const response = await axios.get(`${esp8266IP}/off`);
    res.send(response.data);
  } catch (error) {
    console.error('Error turning off LED:', error.message);
    res.status(500).send('Failed to turn off LED');
  }
});

app.listen(port, () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
});
