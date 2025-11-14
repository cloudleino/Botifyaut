// src/models/Robot.js
const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    location: { type: String, enum: ['Kitchen', 'Serving'], required: true, trim: true },
    status: { type: String, enum: ['Active', 'Paused', 'Offline'], default: 'Offline' },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Robot', RobotSchema);
