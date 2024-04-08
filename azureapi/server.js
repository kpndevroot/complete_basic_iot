// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

mongoose
  // .connect('mongodb://127.0.0.1:27017/iot')
  .connect(
    'mongodb+srv://iotdev:mypass@iotcluster0.8p8gkd3.mongodb.net/?retryWrites=true&w=majority&appName=IOTCluster0',
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
const TunnelSchema = new mongoose.Schema({
  sshUrl: String,
  tcpUrl: String,
  createdAt: {type: Date, default: Date.now},
});

const Tunnel = mongoose.model('Tunnel', TunnelSchema);

// Define a route that responds with a JSON message
app.get('/', (req, res) => {
  res.json({message: 'Hi!'});
});

app.get('/tunnel', async (req, res) => {
  try {
    let doc = await Tunnel.findOne({});
    res.status(200).json({doc: doc, status: true});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// Start the server on port 3000
const PORT = 8080;
app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
