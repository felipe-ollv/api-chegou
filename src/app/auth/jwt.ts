import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign({
    phone: user.phone_number,
    ps: user.uuid_user_profile,
    cs: user.uuid_condominium,
    ts: user.type_profile
  },
    `${process.env.ACCESS_TOKEN_SECRET}`
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign({
    phone: user.phone_number,
    ps: user.uuid_user_profile,
    cs: user.uuid_condominium,
    ts: user.type_profile
  },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: '30m' }
  );
};