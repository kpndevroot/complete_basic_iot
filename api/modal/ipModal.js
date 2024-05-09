const mongoose = require('mongoose');

// create modal schema
const ipSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true},
);
// module.exports = mongoose.model('ip', ipSchema);
const ipModal = mongoose.model('Ip', ipSchema);

module.exports = ipModal;
