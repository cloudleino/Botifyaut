// ✅ Core imports
const express = require('express');
const dotenv = require('dotenv');
const passport = require('./config/passport');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');

// ✅ Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const managerRoutes = require('./routes/managerRoutes');

// ⬇️⬇️⬇️  LÄGG TILL DEN HÄR  ⬇️⬇️⬇️
const robotRoutes = require('./routes/robotRoutes'); // <— CRUD för robotar
// ⬆️⬆️⬆️  LÄGG TILL DEN HÄR  ⬆️⬆️⬆️

// ✅ Socket setup
const { initSocket } = require('./socket');

dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect MongoDB
connectDB();

// ✅ Express setup
const app = express();

// ✅ Allow frontend (React) to access backend (Node)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(passport.initialize());

// ✅ Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = initSocket(server);

// ✅ Middleware to attach io to req (optional, for realtime)
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// ✅ Health route
app.get('/', (_req, res) => {
  res.send('Botify API running!!!');
});

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/manager/robots', robotRoutes); // 🧠 viktigt alias för Manager CRUDnodser

// ⬇️⬇️⬇️  LÄGG TILL DESSA MOUNTS  ⬇️⬇️⬇️
// Primär route för robot-CRUD (frontend bör kalla /api/robots)
app.use('/api/robots', robotRoutes);

// (Valfritt) Bakåtkompatibel alias ifall din frontend just nu ropar /api/manager/robots
app.use('/api/manager/robots', robotRoutes);
// ⬆️⬆️⬆️  LÄGG TILL DESSA MOUNTS  ⬆️⬆️⬆️

// ✅ SOCKET.IO events
io.on('connection', (socket) => {
  console.log('🧑‍🍳 Kitchen client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Kitchen client disconnected:', socket.id);
  });
});

// 🔚 404 & error handlers (hjälper dig se vad som saknas)
app.use((req, res, _next) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
