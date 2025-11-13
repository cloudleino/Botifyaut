// src/models/Robot.js
const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },

    // gör location valfri + default om du inte skickar den
    location: { type: String, default: 'Kitchen', trim: true },

    // lägg till model eftersom du använder det i formuläret
    model: { type: String, required: true, trim: true },

    // matcha exakt det du använder i UI
    status: { 
        type: String, 
        enum: ['idle', 'active', 'offline'], 
        default: 'idle' 
    },

    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Robot', RobotSchema);

