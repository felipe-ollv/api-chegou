import { Router } from 'express';
import condominiumRoutes from './condominium/condominium.route';
import userRoutes from './user/user.route';
import userProfileRoutes from './user-profile/user.profile.route';
import userAccessRoutes from './user-access/user.access.route';

const router = Router();

router.use('/condominium', condominiumRoutes);
router.use('/user', userRoutes);
router.use('/user-profile', userProfileRoutes);
router.use('/user-access', userAccessRoutes);

export default router;
