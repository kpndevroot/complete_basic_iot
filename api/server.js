const express = require('express');
require('dotenv').config();

const axios = require('axios');
const mongoose = require('mongoose');
const ipModal = require('./modal/ipModal.js');
const app = express();
const port = 3000;
const ngrok = require('ngrok');

// const esp8266IP = 'http://192.168.1.5:8080'; // Replace with your ESP8266's IP address
// const esp8266IP = 'https://103.38.12.241:8080'; // Replace with your ESP8266's IP address
let esp8266IP;
const TOKEN = process.env.TOKEN;
mongoose
  // .connect('mongodb://127.0.0.1:27017/iot')
  .connect(
    'mongodb+srv://iotdev:mypass@iotcluster0.8p8gkd3.mongodb.net/?retryWrites=true&w=majority&appName=IOTCluster0',
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://iotdev:mypass@iotcluster0.8p8gkd3.mongodb.net/?retryWrites=true&w=majority&appName=IOTCluster0',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     );
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//   }
// }

// connectToMongoDB();

// run().catch(err => console.error(err));
const TunnelSchema = new mongoose.Schema({
  sshUrl: String,
  tcpUrl: String,
  createdAt: {type: Date, default: Date.now},
});

const Tunnel = mongoose.model('Tunnel', TunnelSchema);

const numRelays = 8;
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

app.listen(port, async () => {
  console.log(`Node.js API listening at http://localhost:${port}`);
  await readEspIp();
  try {
    ngrok.authtoken(TOKEN);
    const sshPromise = ngrok.connect({proto: 'tcp', addr: 22});
    const tcpPromise = ngrok.connect({proto: 'tcp', addr: 3000});

    const [sshUrl, tcpUrl] = await Promise.all([sshPromise, tcpPromise]);

    const update = {
      sshUrl: sshUrl ? sshUrl.toString() : '',
      tcpUrl: tcpUrl ? tcpUrl.toString() : '',
    };

    const options = {upsert: true, new: true}; // Upsert: create if not exists, new: return updated record

    try {
      let existingRecord = await Tunnel.findOneAndUpdate({}, update, options);

      if (existingRecord) {
        // Record exists, updated it
        console.log('Tunnel record updated successfully:', existingRecord);
      } else {
        // Record does not exist, created a new one (this shouldn't happen in your case since there's supposed to be only one document)
        console.log('New tunnel record created:', existingRecord);
      }
      console.log(`Ingress established at: ${sshUrl}`);
      console.log(`Ingress established at: ${tcpUrl}`);
    } catch (error) {
      console.error('Error:', error);
    }

    // console.log({tunnelRecord: tunnelRecord});
    console.log('Tunnel addresses saved to MongoDB.');
  } catch (error) {
    console.error('Error:', error);
  }
});
