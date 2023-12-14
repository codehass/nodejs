class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //where the error is happen.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
