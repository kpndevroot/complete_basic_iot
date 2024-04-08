const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const ipModal = require('./modal/ipModal');
const app = express();
const port = 3000;
// const esp8266IP = 'http://192.168.1.5:8080'; // Replace with your ESP8266's IP address
// const esp8266IP = 'https://103.38.12.241:8080'; // Replace with your ESP8266's IP address
let esp8266IP;
mongoose
  // .connect('mongodb://127.0.0.1:27017/iot')
  .connect(
    'mongodb+srv://iotdev:mypass@iotcluster0.8p8gkd3.mongodb.net/?retryWrites=true&w=majority&appName=IOTCluster0',
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const numRelays = 4;
let readEspIp = async () => {
  let ip = await ipModal.find({});
  // console.log({ip: ip});
  if (ip.length > 0) {
    console.log('IP already exists');
    esp8266IP = ip[0].ip;
    console.log({esp8266IP: esp8266IP});
  } else {
    console.log('IP does not exist');
  }
};
app.get('/readEsp', async (req, res) => {
  try {
    readEspIp();
    res.send({ip: esp8266IP, message: 'IP read successfully'});
  } catch (error) {
    res.send({message: 'Error reading IP'});
  }
});

app.get('/', async (req, res) => {
  try {
    // Retrieve relay status
    const response = await axios.get(`http://${esp8266IP}:8080/`);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error retrieving relay status:', error.message);
    res.status(500).send('Failed to retrieve relay status');
  }
});

for (let i = 0; i < numRelays; i++) {
  const relayIndex = i + 1;

  app.get(`/relay${relayIndex}`, async (req, res) => {
    try {
      // Retrieve status of the specific relay
      const response = await axios.get(
        `http://${esp8266IP}:8080/relay${relayIndex}`,
      );
      res.send(response.data);
    } catch (error) {
      console.error(
        `Error retrieving status of relay ${relayIndex}:`,
        error.message,
      );
      res.status(500).send(`Failed to retrieve status of relay ${relayIndex}`);
    }
  });

  app.get(`/relay${relayIndex}/on`, async (req, res) => {
    try {
      // Send request to turn on the specific relay
      console.log('responseed ', esp8266IP);
      const response = await axios.get(
        `http://${esp8266IP}:8080/relay${relayIndex}/on`,
      );
      res.send(response.data);
    } catch (error) {
      console.error(`Error turning on relay ${relayIndex}:`, error.message);
      res.status(500).send(`Failed to turn on relay ${relayIndex}`);
    }
  });

  app.get(`/relay${relayIndex}/off`, async (req, res) => {
    try {
      // Send request to turn off the specific relay
      const response = await axios.get(
        `http://${esp8266IP}:8080/relay${relayIndex}/off`,
      );
      res.send(response.data);
    } catch (error) {
      console.error(`Error turning off relay ${relayIndex}:`, error.message);
      res.status(500).send(`Failed to turn off relay ${relayIndex}`);
    }
  });
}
app.get('/myip', async (req, res) => {
  // const response = await req.body.ip;
  console.log({query: req.query, ip: req.query.local_ip});
  // res.send(erq.data);

  try {
    let isIp = await ipModal.find({});
    console.log({isIp: isIp});
    console.log({isIp: isIp.length});
    if (isIp.length > 0) {
      console.log('IP already exists');
      await ipModal.updateOne({
        ip: req.query.local_ip,
      });
      res.send('IP already exists and updated');
    } else {
      await ipModal.create({ip: req.query.local_ip});
      console.log('IP does not exist');
      console.log('IP saved');
      res.send('IP not exists');
    }
  } catch (error) {
    console.error('Error saving IP:', error.message);
  }
});

app.post('/myip', async (req, res) => {
  console.log({req: req.query.local_ip});
  // const response = await req.body.ip;

  console.log({body: req});

  // res.send(response.data);
});

app.listen(port, () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
  readEspIp();
});
