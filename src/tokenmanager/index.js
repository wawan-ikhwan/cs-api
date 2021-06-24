const Jwt = require('@hapi/jwt');
const { UnauthorizedTokenException } = require('../exceptions/ClientError');

module.exports = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifyTime(artifacts, {
        maxAgeSec: 60 * 60 * 4,
      });
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      return artifacts.decoded.payload;
    } catch (error) {
      throw new UnauthorizedTokenException(refreshToken, 'refresh token tidak valid / expire');
    }
  },
};
