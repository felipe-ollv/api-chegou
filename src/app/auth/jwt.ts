import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { phone: user.phone_number, ps: user.uuid_user_profile, cs: user.uuid_condominium }, 'senhasecretatest'
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.uuid, uuidUserProfile: user.uuid_user_profile, uuidCondominium: user.uuid_condominium }, `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: '7d' }
  );
};