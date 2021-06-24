const { ClientError, UnauthorizedTokenException } = require('../../exceptions/ClientError');

class AuthHandler {
  constructor(authService, ormawaService, tokenManager, validator) {
    this.authService = authService;
    this.ormawaService = ormawaService;
    this.tokenManager = tokenManager;
    this.validator = validator;

    this.postAuth = this.postAuth.bind(this);
    this.putAuth = this.putAuth.bind(this);
    this.deleteAuth = this.deleteAuth.bind(this);
  }

  async postAuth(request, h) {
    try {
      this.validator.validateLogin(request.payload);
      const { email, password } = request.payload;

      const ormawaId = await this.ormawaService.verifyOrmawa(email, password);

      const refreshToken = this.tokenManager.generateRefreshToken({ ormawaId });
      const accessToken = this.tokenManager.generateAccessToken({ ormawaId });

      await this.authService.insertAuth(refreshToken);

      return {
        status: 'success',
        message: 'post auth berhasil',
        data: {
          refreshToken,
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.code);
      }

      return h.response({
        status: 'fail',
        message: 'Server error',
      }).code(500);
    }
  }

  async putAuth(request, h) {
    try {
      this.validator.validateUpdateToken(request.payload);
      const { refreshToken } = request.payload;

      await this.authService.verifyRefreshToken(refreshToken);
      const { ormawaId } = this.tokenManager.verifyRefreshToken(refreshToken);

      const accessToken = this.tokenManager.generateAccessToken({ ormawaId });
      const newRefreshToken = this.tokenManager.generateRefreshToken({ ormawaId });

      await this.authService.updateAuth(refreshToken, newRefreshToken);

      return {
        status: 'success',
        message: 'token berhasil diperbarui',
        data: {
          refreshToken: newRefreshToken,
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedTokenException) {
        try {
          await this.authService.deleteAuth(error.token);

          return h.response({
            status: 'fail',
            message: error.message,
          }).code(error.code);
        } catch {
          if (error instanceof ClientError) {
            return h.response({
              status: 'fail',
              message: error.message,
            }).code(error.code);
          }
        }
      }

      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.code);
      }

      return h.response({
        status: 'fail',
        message: 'Server error',
      }).code(500);
    }
  }

  async deleteAuth(request, h) {
    try {
      this.validator.validateLogout(request.payload);
      const { refreshToken } = request.payload;

      await this.authService.verifyRefreshToken(refreshToken);
      await this.authService.deleteAuth(refreshToken);

      return {
        status: 'success',
        message: 'delete auth berhasil',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.code);
      }

      return h.response({
        status: 'fail',
        message: 'Server error',
      }).code(500);
    }
  }
}

module.exports = AuthHandler;
