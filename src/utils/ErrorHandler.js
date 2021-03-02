class ErrorHandler extends Error {
  constructor(error) {
    super();
    if ([400, 401, 402, 404].indexOf(error?.response?.status) !== -1) {
      if (error?.response?.data?.details) {
        this.message =
          Object.values(error?.response?.data?.details[0])[0] ||
          'Something went wrong...';
      } else if (error?.response?.data?.message) {
        this.message = error?.response?.data?.message;
      } else {
        this.message = 'Something went wrong...';
      }
    } else if (error?.response?.status === 500) {
      this.message = 'Something went wrong...';
    } else {
      this.message = error.message || 'Something went wrong...';
    }
  }
}

export default ErrorHandler;
