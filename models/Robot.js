const mongoose = require('mongoose');
const RobotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['Active','Paused','Offline'], default: 'Active' }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Robot', RobotSchema);
