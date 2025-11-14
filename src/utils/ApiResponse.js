export default class ApiResponse {
  constructor(successDef, data = null) {
    this.success = true;
    // this.code = successDef.code || "SUCCESS";
    this.message = successDef.message || "Success";
    this.statusCode = successDef.statusCode || 200;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      // code: this.code,
      message: this.message,
      data: this.data,
    });
  }
}
