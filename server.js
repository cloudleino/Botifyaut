// ✅ Core imports
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const http = require('http');

// ✅ Local imports
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ⬅️ Person B’s route
const { initSocket } = require('./socket'); // ⬅️ Make sure file is named socketService.js

// ✅ Load .env BEFORE using process.env
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect to MongoDB
connectDB();

// ✅ Express setup
const app = express();
app.use(express.json());
app.use(passport.initialize());

// ✅ Create HTTP server & attach socket.io
const server = http.createServer(app);
const io = initSocket(server); // initSocket returns io instance

// ✅ Middleware to attach io to req (optional but useful)
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
app.use('/api/orders', orderRoutes); // Person B Kitchen Orders

// ✅ SOCKET.IO connection logs (optional)
io.on('connection', (socket) => {
  console.log('🧑‍🍳 Kitchen client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Kitchen client disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
