// ✅ Core imports
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');

// ✅ Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ⬅️ Person B’s new route

// ✅ Realtime imports (Person B)
const http = require('http');
const { Server } = require('socket.io');

// ⚠️ Move dotenv.config() ABOVE where you use process.env
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(passport.initialize());

// ✅ Create HTTP server & attach to Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (React frontend will connect here later)
  },
});

// ✅ Attach io to every request (so routes can emit real-time events)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Botify API running!!!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // ⬅️ NEW: Person B Kitchen Orders

// ✅ SOCKET.IO events (Person B’s realtime)
io.on('connection', (socket) => {
  console.log('🧑‍🍳 Kitchen client connected');
  socket.on('disconnect', () => console.log('❌ Kitchen client disconnected'));
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
