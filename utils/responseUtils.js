export const successResponse = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
      statusCode: statusCode.toString(),
      message,
      data
    });
};
  
  export const errorResponse = (res, statusCode, message, error = {},data = {}) => {
    return res.status(statusCode).json({
      statusCode: statusCode.toString(),
      message,
      error,
      data
    });
};