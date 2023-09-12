// create custom errors

export class GeneralError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeneralError';
  }
  getErrorCode() {
    return 500;
  }
}

export class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
  getErrorCode() {
    return 400;
  }
}

export class Unauthorized extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
  getErrorCode() {
    return 401;
  }
}

export class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
  getErrorCode() {
    return 404;
  }
}
