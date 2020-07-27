
class ErrorHandler extends Error {
  constructor(error) {
    super();
    if ([400, 401, 402, 404].indexOf(error?.response?.status) !== -1) {
      this.message = error.response.data.message;
    } else {
      this.message = error.message || 'Something went wrong...';
    }
  }
}

export default ErrorHandler;
