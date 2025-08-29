import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { phone: user.phone_number, ps: user.uuid_user_profile, cs: user.uuid_condominium }, 'xpto',
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.uuid, uuidUserProfile: user.uuid_user_profile, uuidCondominium: user.uuid_condominium }, 'lorem',
    { expiresIn: '7d' }
  );
};