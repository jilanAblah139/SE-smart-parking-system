const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Auth service running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
