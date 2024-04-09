// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.get('/', (req, res) => res.send('hi dev i am on'));

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

app.get('/tunnel', async (req, res) => {
  try {
    let doc = await Tunnel.findOne({});
    res.status(200).json({doc: doc, status: true});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// Start the server on port 3000

app.listen(5000, () => console.log('Server ready on port 5000.'));
module.exports = app;
