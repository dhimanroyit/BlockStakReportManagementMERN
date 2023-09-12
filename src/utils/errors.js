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

export class BadRequestError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
  getErrorCode() {
    return 400;
  }
}

export class UnauthorizedError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
  getErrorCode() {
    return 401;
  }
}

export class NotFoundError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
  getErrorCode() {
    return 404;
  }
}

export class ConflictError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
  getErrorCode() {
    return 409;
  }
}
