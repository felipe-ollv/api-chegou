import { Router } from 'express';
import condominiumRoutes from './condominium/condominium.route';
import userRoutes from './user/user.route';
import userProfileRoutes from './user-profile/user.profile.route';

const router = Router();

router.use('/condominium', condominiumRoutes);
router.use('/user', userRoutes);
router.use('/user-profile', userProfileRoutes)

export default router;
