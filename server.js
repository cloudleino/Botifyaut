// ✅ Core imports
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');

// ✅ Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ⬅️ Person B’s new route

const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');


console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? " Found" : "❌ Missing");


// ⚠️ Move dotenv.config() ABOVE where you use process.env
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

// ✅ Connect MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(passport.initialize());

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT || 5000, () => console.log('Server running'));


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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


});
