// eslint-disable-next-line max-classes-per-file
class ServerError extends Error {
  constructor(message = 'Server Error', code = 500) {
    super(message);
    this.code = code;
  }
}

class InternalServerErrorException extends ServerError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

class NotImplementedException extends ServerError {
  constructor(message = 'Not Implemented') {
    super(message, 501);
  }
}

class BadGatewayException extends ServerError {
  constructor(message = 'Bad Gateway') {
    super(message, 502);
  }
}

module.exports = {
  ServerError,
  InternalServerErrorException,
  NotImplementedException,
  BadGatewayException,
};
