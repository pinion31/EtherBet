const jwt = require('jsonwebtoken');
const redis = require('redis');
const { client } = require('./redisClient');
const logger = require('../logger');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = 60 * 10; // ten minutes
const jwtRefreshExpiration = 60 * 60; // one hour

export const generateRefreshToken = (length) => {
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
};

export const generateTokens = (userId) => {
  const refreshToken = generateRefreshToken(64);
  const refreshTokenMaxage = new Date() + jwtRefreshExpiration;

  const accessToken = jwt.sign({ uid: userId }, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  client.set(userId, JSON.stringify({
    refreshToken,
    expires: refreshTokenMaxage,
  }), redis.print);

  return { accessToken, refreshToken };
};

export const verifyToken = (req, res) => new Promise((resolve, reject) => {
  const accessToken = req.cookies.access_token || null;
  const refreshToken = req.cookies.refresh_token || null;
  // Check if tokens found in cookies
  if (accessToken && refreshToken) {
    jwt.verify(accessToken, jwtSecret, async (err, decoded) => {
      logger.info('Verifying Token');
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const redisToken = client.get(decoded.uid, (error, val) => {
            if (error) return null;
            return val || null;
          });

          if (!redisToken || redisToken.refreshToken !== refreshToken) {
            reject(new Error('Invalid Token'));
          } else {
            if (redisToken.expires > new Date()) {
              logger.info('Refresh Token Expired. Issuing new one');
              const newRefreshToken = generateRefreshToken(64);
              res.cookie('refresh_token', newRefreshToken, {
                // secure: true, // uncomment this if your
                // web app uses HTTPS protocol
                httpOnly: true,
              });

              const refreshTokenMaxage = new Date() + jwtRefreshExpiration;
              client.set(
                decoded.uid,
                JSON.stringify({
                  refresh_token: newRefreshToken,
                  expires: refreshTokenMaxage,
                }), redis.print,
              );

            }
            const token = jwt.sign({ uid: decoded.uid }, jwtSecret, {
              expiresIn: jwtExpiration,
            });

            res.cookie('access_token', token, {
              // secure: true,
              httpOnly: true,
            });
            resolve({ req, res });
          }
        } else {
          reject(err);
        }
      } else {
        logger.info('Token Verified for user');
        resolve({ req, res });
      }
    });
  } else {
    reject(new Error('Token missing.'));
  }
});

export const deleteToken = (id) => {
  client.del(id);
};
