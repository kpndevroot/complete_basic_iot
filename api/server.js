const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;
// const esp8266IP = "http://192.168.1.7"; // Replace with your ESP8266's IP address
const esp8266IP = "http://192.168.96.60"; // Replace with your ESP8266's IP address

const numRelays = 4;

app.get("/", async (req, res) => {
  try {
    // Retrieve relay status
    const response = await axios.get(`${esp8266IP}/`);
    res.send(response.data);
  } catch (error) {
    console.error("Error retrieving relay status:", error.message);
    res.status(500).send("Failed to retrieve relay status");
  }
});

for (let i = 0; i < numRelays; i++) {
  const relayIndex = i + 1;

  app.get(`/relay${relayIndex}`, async (req, res) => {
    try {
      // Retrieve status of the specific relay
      const response = await axios.get(`${esp8266IP}/relay${relayIndex}`);
      res.send(response.data);
    } catch (error) {
      console.error(
        `Error retrieving status of relay ${relayIndex}:`,
        error.message
      );
      res.status(500).send(`Failed to retrieve status of relay ${relayIndex}`);
    }
  });

  app.get(`/relay${relayIndex}/on`, async (req, res) => {
    try {
      // Send request to turn on the specific relay
      const response = await axios.get(`${esp8266IP}/relay${relayIndex}/on`);
      res.send(response.data);
    } catch (error) {
      console.error(`Error turning on relay ${relayIndex}:`, error.message);
      res.status(500).send(`Failed to turn on relay ${relayIndex}`);
    }
  });

  app.get(`/relay${relayIndex}/off`, async (req, res) => {
    try {
      // Send request to turn off the specific relay
      const response = await axios.get(`${esp8266IP}/relay${relayIndex}/off`);
      res.send(response.data);
    } catch (error) {
      console.error(`Error turning off relay ${relayIndex}:`, error.message);
      res.status(500).send(`Failed to turn off relay ${relayIndex}`);
    }
  });
}

app.listen(port, () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
});
