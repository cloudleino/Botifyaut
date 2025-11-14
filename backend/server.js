// ✅ Core imports
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const http = require('http');
const cors = require('cors');  // Allow frontend requests
const connectDB = require('./config/db');

// ✅ Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const robotRoutes = require('./routes/robotRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// ✅ Socket setup
const { initSocket } = require('./socket');

// ⚙️ Load .env BEFORE using process.env
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect MongoDB
connectDB();

// ✅ Express setup
const app = express();

// Allow frontend (React) to access backend (Node)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = initSocket(server);

// Attach io to req so routes can emit events
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Default route
app.get('/', (req, res) => {
    res.send('Botify API running!!!');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/robots', robotRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);

// Socket connections
io.on('connection', (socket) => {
    console.log('🧑‍🍳 Kitchen client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('❌ Kitchen client disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

