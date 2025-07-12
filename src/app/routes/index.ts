import { Router } from 'express';
import condominiumRoutes from './condominium/condominium.route';
import userRoutes from './user/user.route'

const router = Router();

router.use('/condominium', condominiumRoutes);
router.use('user', userRoutes)

export default router;
