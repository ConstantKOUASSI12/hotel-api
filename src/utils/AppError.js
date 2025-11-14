export default class AppError extends Error {
  constructor(errorDef, data = null) {
    super(errorDef.message);
    this.statusCode = errorDef.statusCode || 500;
    this.code = errorDef.code || "INTERNAL_ERROR";
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}