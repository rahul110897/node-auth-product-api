// createDefaultUser.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // Adjust the path as necessary

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const createUser = async () => {
  try {
    const user = new User({
      username: 'testuser',
      password: 'testpassword',
    });

    await user.save();
    console.log('Default user created');
  } catch (error) {
    console.error('Error creating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

connectDB().then(createUser);
