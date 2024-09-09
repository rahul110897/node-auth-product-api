import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseUtils.js';
import { authMessages } from '../utils/messageUtils.js';
import { isBlacklisted } from '../utils/tokenBlacklist.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return errorResponse(res, 401, authMessages.TOKEN_MISSING);
  }

  // Check if the token is blacklisted
  if (isBlacklisted(token)) {
    return errorResponse(res, 401, authMessages.INVALID_TOKEN);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 501, authMessages.TOKEN_HAS_EXPIRED, error.message);
    } else {
      return errorResponse(res, 401, authMessages.INVALID_TOKEN, error.message);
    }
  }
};
