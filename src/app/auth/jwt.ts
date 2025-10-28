import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  console.log(user)
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
  return jwt.sign(
    { userId: user.uuid, uuidUserProfile: user.uuid_user_profile, uuidCondominium: user.uuid_condominium }, `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: '6d' }
  );
};