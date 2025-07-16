import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './route/User.route.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));


app.use('/api/user', User);

app.listen(3000, () => {
  console.log(' server running http://localhost:3000');
});
