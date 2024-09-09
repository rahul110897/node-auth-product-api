// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dbMessages } from '../utils/messageUtils.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(dbMessages.CONNECTION_SUCCESS);
  } catch (error) {
    console.error(`${dbMessages.CONNECTION_ERROR}`, error.message);
    process.exit(1);
  }
};

export default connectDB;
