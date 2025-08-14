import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.phone_number, psswrd: user.password }, 'xpto',
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.uuid, psswrd: user.password }, 'lorem',
    { expiresIn: '7d' }
  );
};