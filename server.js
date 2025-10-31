const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');  //  make sure this path matches your actual file location
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? " Found" : "❌ Missing");


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // for JSON requests
app.use(passport.initialize());


app.get('/', (req, res) => {
  res.send('Botify API running!!!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);




});



