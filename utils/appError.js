class AppError {
  constructor(code, message, responseCode, errorInfo = []) {
    this.code = code;
    this.message = message;
    this.responseCode = responseCode;
    this.errorInfo = errorInfo;
  }
}

export default AppError;