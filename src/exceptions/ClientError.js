// eslint-disable-next-line max-classes-per-file
class ClientError extends Error {
  constructor(message = 'Client Error', code = 400) {
    super(message);
    this.code = code;
  }
}

class BadRequestException extends ClientError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class UnauthorizedException extends ClientError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenException extends ClientError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class NotFoundException extends ClientError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

module.exports = {
  ClientError,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
};
