// ✅ Ladda .env först (justera path om .env ligger i /server)
require('dotenv').config({ path: './server/.env' });

// ✅ Core imports
const express = require('express');
const passport = require('passport');
const http = require('http');
const connectDB = require('./config/db');

// ✅ Registrera passport-strategier EFTER att .env är laddad
require('./config/passport');

// ✅ Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ✅ Socket setup
const { initSocket } = require('./socket');

// ✅ Testa att miljövariablerna laddas
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect MongoDB
connectDB();
