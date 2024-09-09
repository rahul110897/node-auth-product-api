// controllers/authController.js
import { login as loginService, refreshToken as refreshTokenService } from '../services/authService.js';
import { authMessages } from '../utils/messageUtils.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';
import { addToBlacklist } from '../utils/tokenBlacklist.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { accessToken, refreshToken } = await loginService(username, password);
    return successResponse(res, 200, authMessages.LOGIN_SUCCESSFUL, { accessToken, refreshToken });
  } catch (error) {
    return errorResponse(res, 401, authMessages.INVALID_CREDENTIALS, error.message);
  }
};

export const logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return errorResponse(res, 400, authMessages.TOKEN_MISSING);
  }
  addToBlacklist(token);
  return successResponse(res, 200, authMessages.LOGOUT_SUCCESS);
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return errorResponse(res, 400, authMessages.REFRESH_TOKEN_REQUIRED);
  }

  try {
    const { newAccessToken, newRefreshToken } = await refreshTokenService(refreshToken);
    return successResponse(res, 200, authMessages.REFRESH_TOKEN_SUCCESSFULLY, { newAccessToken, newRefreshToken });
  } catch (error) {
    return errorResponse(res, 401, authMessages.REFRESH_TOKEN_INVALID, error.message);
  }
};