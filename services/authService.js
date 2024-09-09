// services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authMessages } from '../utils/messageUtils.js';
import { generateToken, generateRefreshToken } from '../utils/tokenUtils.js';

export const login = async (username, password) => {
  // Find user by username
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error(authMessages.INVALID_CREDENTIALS);
  }

  // Generate access and refresh tokens
  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  
  return { accessToken, refreshToken };
};

// Refresh Token Service
export const refreshToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error(authMessages.USER_NOT_FOUND);

    // Generate new tokens
    const newAccessToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    throw new Error(authMessages.REFRESH_TOKEN_INVALID);
  }
};